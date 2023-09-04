export class MappingTableSetting{
    public static setting = {
        mode: 'external',
        hideSubHeader: false,
        actions: {
          position: 'right',
          add: false,
          edit : false,
          delete : false,
          custom: [
            { name: 'editrecord', title: 'Edit'},
            { name: 'activerecord', title: 'Activate' },
            { name: 'deactiverecord', title: 'Deactivate' },
          ],
        },
        // edit: {
        //   editButtonContent: '<button>Active</button>',
        //   mode: 'external'
        // },
        // delete: {
        //   deleteButtonContent: '<button>Deactive</button>',
        //   mode: 'external'
        // },
        pager :{
          perPage : 10
        },
        columns: {
          empId: {
            title: 'Emp Id',
            // sort : false,
            width : '90px'
          },
          empName: {
            title: 'Emp name',
            // sort : false,
          },
          menuName: {
            title: 'Menu name',
            // sort : false,
          },
          locationName: {
            title: 'Location ?',
            sort : false,
            class : "info mapping_location"
          },
          verifierName: {
            title: 'Verifier ',
            // sort : false,
          },
          approverName: {
            title: 'Approver ',
            // sort : false,
          },
          active: {
            title: 'Active',
            // sort : false,
          },
          startDate: {
            title: 'Start Date',
            // sort : false,
          },
          endDate: {
            title: 'End Date',
            // sort : false,
          }
        }
    }
}