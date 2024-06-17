# SKAO Shift Log Tool

The repository for the SKA’s Shift Log Tool (SLT).

## Local development and testing

### Config SKA repositories to be a part of the React packages search path

To allow for the SKA libraries to be picked up when you re-install packages,

run `yarn config set @ska-telescope:registry https://artefact.skao.int/repository/npm-internal/`

### Update to the latest SKA repositories in the project

Run `yarn skao:update` to pull in latest SKA repository dependencies to the project

### Installing project dependencies

Run `yarn install` to install the latest project dependencies from package.json and yarn.lock

### Running a front-end development server

Run `yarn start` for a dev server and navigate to `http://localhost:8090/`. The
app will automatically reload if you change any of the source files.

To use a ODA backend deployed on localhost please include the back-end URL in the `yarn start` command, for example `BACKEND_URL=http://localhost/oda/api/v2`.

### Running tests

Run `yarn test:headless` to execute the Cypress tests.

### Running static code analysis

Run `yarn lint` to lint the code.

## Deploying to Kubernetes

The full production system will consist of the SLT accessing ODA REST API which connects with a PostgreSQL instance.

To deploy all of these services, run:

```
make oci-build
```

The umbrella Helm chart can then be deployed with

```
make k8s-install-chart
```

and uninstalled with

```
make k8s-uninstall-chart
```

The `yarn start` script runs two commands: `make set-dev-env-vars` to set the URL for the ODA back-end and `webpack serve` to start the development server.

If using minikube, run `minikube ip` to find the host IP. `KUBE_NAMESPACE` is set to `ska-oso-slt-ui` by default.  
The backend component will also be deployed to a separate pod, which the web application will make requests to.

The UI should then be available externally at `http://<MINIKUBE_IP>/<KUBE_NAMESPACE>/slt/` and the back-end URL will be available at `http://<minikube-ip>/ska-oso-slt-ui/oda/api/v4`

### Including an unpublished Helm chart for an SLT dependency

The ska-oso-slt-ui Helm chart depends on the Helm charts of several other components:

1. ska-db-oda-umbrella for ODA REST API.

To use a WIP chart for one of these dependencies, first create a Gitlab token with read_api privileges following
the instructions at https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html. Then, add the Gitlab
Helm repository for the project you want to source an unpublished chart from. For example, to add the Helm
chart repository for the ODA services project, run

```
helm repo add --username <username> --password <gitlab token> ska-oso-oda https://gitlab.com/api/v4/projects/19329547/packages/helm/dev
helm repo update
```

Finally, edit the umbrella chart definition (found in `charts/ska-oso-slt-ui-umbrella/Chart.yaml`), modifying
the version and repository definitions to point to the dependency chart you want to source.

## Documentation

[![Documentation Status](https://readthedocs.org/projects/ska-telescope-ska-oso-slt-ui/badge/?version=latest)](https://developer.skao.int/projects/ska-oso-slt-ui/en/latest/?badge=latest)

Documentation can be found in the `docs` folder. To build docs, install the
documentation specific requirements:

```
pip3 install -r docs/requirements.txt
```

and build the documentation (will be built in docs/build folder) with

```
make docs-build html
```
