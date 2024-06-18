# KUBE_HOST defines the IP address of the Minikube ingress.
# KUBE_HOST ?= http://`minikube ip`
KUBE_HOST ?= http://localhost:8090/
# KUBE_NAMESPACE defines the Kubernetes Namespace that will be deployed to
# using Helm.  If this does not already exist it will be created
KUBE_NAMESPACE ?= ska-oso-slt-ui
K8S_CHART ?= ska-oso-slt-ui-umbrella

# The default ODA_BACKEND_URL points to the umbrella chart ODA back-end deployment
BACKEND_URL ?= $(KUBE_HOST)/$(KUBE_NAMESPACE)/slt/api/v1
K8S_CHART_PARAMS += \
  --set ska-oso-slt-ui.backendURL=$(BACKEND_URL)

# include core makefile targets for release management
-include .make/base.mk
-include .make/oci.mk
-include .make/helm.mk
-include .make/k8s.mk

# For the test, dev and integration environment, use the freshly built image in the GitLab registry
ENV_CHECK := $(shell echo $(CI_ENVIRONMENT_SLUG) | egrep 'test|dev|integration')
ifneq ($(ENV_CHECK),)
K8S_CHART_PARAMS += --set ska-oso-slt-ui.image.tag=$(VERSION)-dev.c$(CI_COMMIT_SHORT_SHA) \
	--set ska-oso-slt-ui.image.registry=$(CI_REGISTRY)/ska-telescope/oso/ska-oso-slt-ui
endif

set-dev-env-vars:
	BASE_URL="/" BACKEND_URL=$(BACKEND_URL) ENVJS_FILE=./public/env.js ./nginx_env_config.sh