const SHIFT_DATA_LIST = [
  {
    id: 1,
    shift_id: 'sl-m0001-20250106-11785506',
    shift_start: '2024-10-22T11:24:04.389077Z',
    shift_end: '2024-10-22T11:24:04.389077Z',
    annotation: [
      {
        id: 1,
        annotation: 'This is dummy annotation one',
        user_name: 'Ross',
        shift_id: 'txn-local-20250106-787905165',
        metadata: {
          created_by: 'DefaultUser',
          created_on: '2025-01-06T14:44:14.547243+05:30',
          last_modified_by: 'Ross',
          last_modified_on: '2025-01-06T14:44:21.158110+05:30'
        }
      },
      {
        id: 2,
        annotation: 'This is dummy annotation two',
        user_name: 'DefaultUser',
        shift_id: 'txn-local-20250106-787905165',
        metadata: {
          created_by: 'Ross',
          created_on: '2025-01-06T14:43:09.101233+05:30',
          last_modified_by: 'Ross',
          last_modified_on: '2025-01-06T14:43:09.101233+05:30'
        }
      }
    ],
    shift_operator: 'TestUser',
    comments: [
      {
        id: 1,
        comment: 'This is shift comment one',
        shift_id: 'sl-m0001-20250106-11785506',
        image: [],
        metadata: {
          created_by: 'DefaultUser',
          created_on: '2024-10-22T11:24:04.388998Z',
          last_modified_by: 'DefaultUser',
          last_modified_on: '2024-10-22T11:25:36.971764Z'
        }
      },
      {
        id: 2,
        comment: 'This is shift comment two',
        shift_id: 'sl-m0001-20250106-11785506',
        image: [],
        metadata: {
          created_by: 'DefaultUser',
          created_on: '2024-10-22T11:24:04.388998Z',
          last_modified_by: 'DefaultUser',
          last_modified_on: '2024-10-22T11:25:36.971764Z'
        }
      }
    ],
    shift_logs: [
      {
        info: {
          eb_id: 'eb-t0001-20241022-000066',
          sbd_ref: 'sbd-t0001-20240822-00008',
          sbi_ref: 'sbi-t0001-20240822-00009',
          metadata: {
            version: 1,
            created_by: 'DefaultUser',
            created_on: '2024-10-22T11:25:36.953526Z',
            pdm_version: '15.4.0',
            last_modified_by: 'DefaultUser',
            last_modified_on: '2024-10-22T11:25:36.953526Z'
          },
          interface: 'https://schema.skao.int/ska-oso-pdm-eb/0.1',
          telescope: 'ska_mid',
          sbi_status: 'failed',
          eb_status: 'Created',
          sbd_version: 1,
          request_responses: [
            {
              status: 'OK',
              request: 'ska_oso_scripting.functions.devicecontrol.assign_resource',
              response: {
                result: 'this is a result'
              },
              request_args: {
                kwargs: {
                  subarray_id: '1'
                }
              },
              request_sent_at: '2022-09-23T15:43:53.971548Z',
              response_received_at: '2022-09-23T15:43:53.971548Z'
            },
            {
              status: 'OK',
              request: 'ska_oso_scripting.functions.devicecontrol.configure_resource',
              response: {
                result: 'this is a result'
              },
              request_args: {
                kwargs: {
                  subarray_id: '1'
                }
              },
              request_sent_at: '2022-09-23T15:43:53.971548Z',
              response_received_at: '2022-09-23T15:43:53.971548Z'
            },
            {
              request: 'ska_oso_scripting.functions.devicecontrol.scan',
              error: {
                detail: 'this is an error'
              },
              request_sent_at: '2022-09-23T15:43:53.971548Z',
              status: 'ERROR'
            }
          ]
        },
        source: 'ODA',
        log_time: '2024-10-22T11:24:14.406107Z',
        comments: [
          {
            id: 1,
            log_comment: 'This is log comment one',
            operator_name: 'DefaultUser',
            shift_id: 'sl-m0001-20250106-11785506',
            eb_id: 'eb-t0001-20241022-000066',
            metadata: {
              created_by: 'DefaultUser',
              created_on: '2024-10-22T11:24:04.388998Z',
              last_modified_by: 'DefaultUser',
              last_modified_on: '2024-10-22T11:25:36.971764Z'
            }
          },
          {
            id: 2,
            log_comment: 'This is log comment two',
            operator_name: 'TestUser',
            shift_id: 'sl-m0001-20250106-11785506',
            eb_id: 'eb-t0001-20241022-000066',
            metadata: {
              created_by: 'DefaultUser',
              created_on: '2024-10-22T11:24:04.388998Z',
              last_modified_by: 'DefaultUser',
              last_modified_on: '2024-10-22T11:25:36.971764Z'
            }
          }
        ]
      },
      {
        info: {
          eb_id: 'eb-t0001-20241022-000066',
          sbd_ref: 'sbd-t0001-20240822-00008',
          sbi_ref: 'sbi-t0001-20240822-00009',
          metadata: {
            version: 1,
            created_by: 'DefaultUser',
            created_on: '2024-10-22T11:25:36.953526Z',
            pdm_version: '15.4.0',
            last_modified_by: 'DefaultUser',
            last_modified_on: '2024-10-22T11:25:36.953526Z'
          },
          interface: 'https://schema.skao.int/ska-oso-pdm-eb/0.1',
          telescope: 'ska_mid',
          sbi_status: 'Observed',
          eb_status: 'Fully Observed',
          sbd_version: 1,
          request_responses: [
            {
              status: 'OK',
              request: 'ska_oso_scripting.functions.devicecontrol.assign_resource',
              response: {
                result: 'this is a result'
              },
              request_args: {
                kwargs: {
                  subarray_id: '1'
                }
              },
              request_sent_at: '2022-09-23T15:43:53.971548Z',
              response_received_at: '2022-09-23T15:43:53.971548Z'
            },
            {
              status: 'OK',
              request: 'ska_oso_scripting.functions.devicecontrol.configure_resource',
              response: {
                result: 'this is a result'
              },
              request_args: {
                kwargs: {
                  subarray_id: '1'
                }
              },
              request_sent_at: '2022-09-23T15:43:53.971548Z',
              response_received_at: '2022-09-23T15:43:53.971548Z'
            },
            {
              status: 'OK',
              request: 'ska_oso_scripting.functions.devicecontrol.scan',
              response: {
                result: 'this is a result'
              },
              request_args: {
                kwargs: {
                  subarray_id: '1'
                }
              },
              request_sent_at: '2022-09-23T15:43:53.971548Z',
              response_received_at: '2022-09-23T15:43:53.971548Z'
            },
            {
              status: 'OK',
              request: 'ska_oso_scripting.functions.devicecontrol.release_all_resources',
              response: {
                result: 'this is a result'
              },
              request_args: {
                kwargs: {
                  subarray_id: '1'
                }
              },
              request_sent_at: '2022-09-23T15:43:53.971548Z',
              response_received_at: '2022-09-23T15:43:53.971548Z'
            },
            {
              response: {
                result: 'this is a result'
              },
              status: 'OK',
              request: 'ska_oso_scripting.functions.devicecontrol.end',
              request_sent_at: '2022-09-23T15:43:53.971548Z',
              response_received_at: '2022-09-23T15:43:53.971548Z'
            }
          ]
        },
        source: 'ODA',
        log_time: '2024-10-22T11:24:14.406107Z',
        comments: [
          {
            id: 1,
            log_comment: 'This is log comment one',
            operator_name: 'DefaultUser',
            shift_id: 'sl-m0001-20250106-11785506',
            metadata: {
              version: 1,
              created_by: 'DefaultUser',
              created_on: '2024-10-22T11:25:36.953526Z',
              pdm_version: '15.4.0',
              last_modified_by: 'DefaultUser',
              last_modified_on: '2024-10-22T11:25:36.953526Z'
            },
            eb_id: 'eb-t0001-20241022-000066'
          },
          {
            id: 2,
            log_comment: 'This is log comment two',
            operator_name: 'TestUser',
            shift_id: 'sl-m0001-20250106-11785506',
            eb_id: 'eb-t0001-20241022-000066',
            metadata: {
              version: 1,
              created_by: 'DefaultUser',
              created_on: '2024-10-22T11:25:36.953526Z',
              pdm_version: '15.4.0',
              last_modified_by: 'DefaultUser',
              last_modified_on: '2024-10-22T11:25:36.953526Z'
            }
          }
        ]
      }
    ],
    metadata: {
      created_by: 'DefaultUser',
      created_on: '2024-10-22T11:24:04.388998Z',
      last_modified_by: 'DefaultUser',
      last_modified_on: '2024-10-22T11:25:36.971764Z'
    }
  },
  {
    id: 2,
    shift_id: 'sl-m0001-20250106-11785507',
    shift_start: '2024-10-22T11:24:04.389077Z',
    shift_operator: 'TestUser',
    shift_end: '2024-10-22T11:24:04.389077Z',
    shift_logs: [
      {
        info: {
          eb_id: 'eb-t0001-20241022-000066',
          sbd_ref: 'sbd-t0001-20240822-00008',
          sbi_ref: 'sbi-t0001-20240822-00009',
          metadata: {
            version: 1,
            created_by: 'DefaultUser',
            created_on: '2024-10-22T11:25:36.953526Z',
            pdm_version: '15.4.0',
            last_modified_by: 'DefaultUser',
            last_modified_on: '2024-10-22T11:25:36.953526Z'
          },
          interface: 'https://schema.skao.int/ska-oso-pdm-eb/0.1',
          telescope: 'ska_mid',
          sbi_status: 'failed',
          eb_status: 'Created',
          sbd_version: 1
        },
        source: 'ODA',
        log_time: '2024-10-22T11:24:14.406107Z'
      },
      {
        info: {
          eb_id: 'eb-t0001-20241022-000066',
          sbd_ref: 'sbd-t0001-20240822-00008',
          sbi_ref: 'sbi-t0001-20240822-00009',
          metadata: {
            version: 1,
            created_by: 'DefaultUser',
            created_on: '2024-10-22T11:25:36.953526Z',
            pdm_version: '15.4.0',
            last_modified_by: 'DefaultUser',
            last_modified_on: '2024-10-22T11:25:36.953526Z'
          },
          interface: 'https://schema.skao.int/ska-oso-pdm-eb/0.1',
          telescope: 'ska_mid',
          sbi_status: 'observed',
          eb_status: 'Fully Observed',
          sbd_version: 1,
          request_responses: [
            {
              status: 'OK',
              request: 'ska_oso_scripting.functions.devicecontrol.assign_resource',
              response: {
                result: 'this is a result'
              },
              request_args: {
                kwargs: {
                  subarray_id: '1'
                }
              },
              request_sent_at: '2022-09-23T15:43:53.971548Z',
              response_received_at: '2022-09-23T15:43:53.971548Z'
            },
            {
              status: 'OK',
              request: 'ska_oso_scripting.functions.devicecontrol.configure_resource',
              response: {
                result: 'this is a result'
              },
              request_args: {
                kwargs: {
                  subarray_id: '1'
                }
              },
              request_sent_at: '2022-09-23T15:43:53.971548Z',
              response_received_at: '2022-09-23T15:43:53.971548Z'
            },
            {
              status: 'OK',
              request: 'ska_oso_scripting.functions.devicecontrol.scan',
              response: {
                result: 'this is a result'
              },
              request_args: {
                kwargs: {
                  subarray_id: '1'
                }
              },
              request_sent_at: '2022-09-23T15:43:53.971548Z',
              response_received_at: '2022-09-23T15:43:53.971548Z'
            },
            {
              status: 'OK',
              request: 'ska_oso_scripting.functions.devicecontrol.release_all_resources',
              response: {
                result: 'this is a result'
              },
              request_args: {
                kwargs: {
                  subarray_id: '1'
                }
              },
              request_sent_at: '2022-09-23T15:43:53.971548Z',
              response_received_at: '2022-09-23T15:43:53.971548Z'
            },
            {
              response: {
                result: 'this is a result'
              },
              status: 'OK',
              request: 'ska_oso_scripting.functions.devicecontrol.end',
              request_sent_at: '2022-09-23T15:43:53.971548Z',
              response_received_at: '2022-09-23T15:43:53.971548Z'
            }
          ]
        },
        source: 'ODA',
        log_time: '2024-10-22T11:24:14.406107Z'
      }
    ],
    metadata: {
      created_by: 'DefaultUser',
      created_on: '2024-10-22T11:24:04.388998Z',
      last_modified_by: 'DefaultUser',
      last_modified_on: '2024-10-22T11:25:36.971764Z'
    }
  },
  {
    id: 3,
    shift_id: 'sl-m0001-20250106-11785506',
    shift_operator: 'TestUser',
    shift_logs: [
      {
        info: {
          eb_id: 'eb-t0001-20241022-000066',
          sbd_ref: 'sbd-t0001-20240822-00008',
          sbi_ref: 'sbi-t0001-20240822-00009',
          metadata: {
            version: 1,
            created_by: 'DefaultUser',
            created_on: '2024-10-22T11:25:36.953526Z',
            pdm_version: '15.4.0',
            last_modified_by: 'DefaultUser',
            last_modified_on: '2024-10-22T11:25:36.953526Z'
          },
          interface: 'https://schema.skao.int/ska-oso-pdm-eb/0.1',
          telescope: 'ska_mid',
          sbi_status: 'failed',
          eb_status: 'Created',
          sbd_version: 1,
          request_responses: [
            {
              status: 'OK',
              request: 'ska_oso_scripting.functions.devicecontrol.assign_resource',
              response: {
                result: 'this is a result'
              },
              request_args: {
                kwargs: {
                  subarray_id: '1'
                }
              },
              request_sent_at: '2022-09-23T15:43:53.971548Z',
              response_received_at: '2022-09-23T15:43:53.971548Z'
            },
            {
              status: 'OK',
              request: 'ska_oso_scripting.functions.devicecontrol.configure_resource',
              response: {
                result: 'this is a result'
              },
              request_args: {
                kwargs: {
                  subarray_id: '1'
                }
              },
              request_sent_at: '2022-09-23T15:43:53.971548Z',
              response_received_at: '2022-09-23T15:43:53.971548Z'
            },
            {
              request: 'ska_oso_scripting.functions.devicecontrol.scan',
              error: {
                detail: 'this is an error'
              },
              request_sent_at: '2022-09-23T15:43:53.971548Z',
              status: 'ERROR'
            }
          ]
        },
        source: 'ODA',
        log_time: '2024-10-22T11:24:14.406107Z',
        comments: [
          {
            id: 1,
            log_comment: 'This is log comment one',
            operator_name: 'DefaultUser',
            shift_id: 'sl-m0001-20250106-11785506',
            eb_id: 'eb-t0001-20241022-000066',
            metadata: {
              created_by: 'DefaultUser',
              created_on: '2024-10-22T11:24:04.388998Z',
              last_modified_by: 'DefaultUser',
              last_modified_on: '2024-10-22T11:25:36.971764Z'
            }
          },
          {
            id: 2,
            log_comment: 'This is log comment two',
            operator_name: 'TestUser',
            shift_id: 'sl-m0001-20250106-11785506',
            eb_id: 'eb-t0001-20241022-000066',
            metadata: {
              created_by: 'DefaultUser',
              created_on: '2024-10-22T11:24:04.388998Z',
              last_modified_by: 'DefaultUser',
              last_modified_on: '2024-10-22T11:25:36.971764Z'
            }
          }
        ]
      },
      {
        info: {
          eb_id: 'eb-t0001-20241022-000066',
          sbd_ref: 'sbd-t0001-20240822-00008',
          sbi_ref: 'sbi-t0001-20240822-00009',
          metadata: {
            version: 1,
            created_by: 'DefaultUser',
            created_on: '2024-10-22T11:25:36.953526Z',
            pdm_version: '15.4.0',
            last_modified_by: 'DefaultUser',
            last_modified_on: '2024-10-22T11:25:36.953526Z'
          },
          interface: 'https://schema.skao.int/ska-oso-pdm-eb/0.1',
          telescope: 'ska_mid',
          sbi_status: 'Observed',
          eb_status: 'Fully Observed',
          sbd_version: 1,
          request_responses: [
            {
              status: 'OK',
              request: 'ska_oso_scripting.functions.devicecontrol.assign_resource',
              response: {
                result: 'this is a result'
              },
              request_args: {
                kwargs: {
                  subarray_id: '1'
                }
              },
              request_sent_at: '2022-09-23T15:43:53.971548Z',
              response_received_at: '2022-09-23T15:43:53.971548Z'
            },
            {
              status: 'OK',
              request: 'ska_oso_scripting.functions.devicecontrol.configure_resource',
              response: {
                result: 'this is a result'
              },
              request_args: {
                kwargs: {
                  subarray_id: '1'
                }
              },
              request_sent_at: '2022-09-23T15:43:53.971548Z',
              response_received_at: '2022-09-23T15:43:53.971548Z'
            },
            {
              status: 'OK',
              request: 'ska_oso_scripting.functions.devicecontrol.scan',
              response: {
                result: 'this is a result'
              },
              request_args: {
                kwargs: {
                  subarray_id: '1'
                }
              },
              request_sent_at: '2022-09-23T15:43:53.971548Z',
              response_received_at: '2022-09-23T15:43:53.971548Z'
            },
            {
              status: 'OK',
              request: 'ska_oso_scripting.functions.devicecontrol.release_all_resources',
              response: {
                result: 'this is a result'
              },
              request_args: {
                kwargs: {
                  subarray_id: '1'
                }
              },
              request_sent_at: '2022-09-23T15:43:53.971548Z',
              response_received_at: '2022-09-23T15:43:53.971548Z'
            },
            {
              response: {
                result: 'this is a result'
              },
              status: 'OK',
              request: 'ska_oso_scripting.functions.devicecontrol.end',
              request_sent_at: '2022-09-23T15:43:53.971548Z',
              response_received_at: '2022-09-23T15:43:53.971548Z'
            }
          ]
        },
        source: 'ODA',
        log_time: '2024-10-22T11:24:14.406107Z',
        comments: [
          {
            id: 1,
            log_comment: 'This is log comment one',
            operator_name: 'DefaultUser',
            shift_id: 'sl-m0001-20250106-11785506',
            metadata: {
              version: 1,
              created_by: 'DefaultUser',
              created_on: '2024-10-22T11:25:36.953526Z',
              pdm_version: '15.4.0',
              last_modified_by: 'DefaultUser',
              last_modified_on: '2024-10-22T11:25:36.953526Z'
            },
            eb_id: 'eb-t0001-20241022-000066'
          },
          {
            id: 2,
            log_comment: 'This is log comment two',
            operator_name: 'TestUser',
            shift_id: 'sl-m0001-20250106-11785506',
            eb_id: 'eb-t0001-20241022-000066',
            metadata: {
              version: 1,
              created_by: 'DefaultUser',
              created_on: '2024-10-22T11:25:36.953526Z',
              pdm_version: '15.4.0',
              last_modified_by: 'DefaultUser',
              last_modified_on: '2024-10-22T11:25:36.953526Z'
            }
          }
        ]
      }
    ],
    metadata: {
      created_by: 'DefaultUser',
      created_on: '2024-10-22T11:24:04.388998Z',
      last_modified_by: 'DefaultUser',
      last_modified_on: '2024-10-22T11:25:36.971764Z'
    }
  }
];

export default SHIFT_DATA_LIST;
