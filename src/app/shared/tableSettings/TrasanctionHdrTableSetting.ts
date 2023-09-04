export class TrasanctionHdrTableSetting{
    public static setting = {
        mode: 'external',
        hideSubHeader: false,
        actions: {
          position: 'right',
          add: false,
          edit : false,
          delete : true
        },
        pager :{
          perPage : 10
        },
        columns: {
          transactionId: {
            // title: 'TRANSACTION_ID',
            title: 'Activity Id',
            width : '138px'
            // sort : false,
          },
          dateTime: {
            title: 'Date',
            width : '138px'
            // sort : false,
          },
          verifiedDate: {
            title: 'Verify Date',
            width : '138px'
            // sort : false,
          },
          // verifiedBy: {
          //   title: 'Verify By',
          //   width : '200px'
          //   // sort : false,
          // },
          approvedDate : {
            title : "Approve Date",
            width : '138px'
            // sort : false,
          },
          // approvedBy : {
          //   title : "Approve By",
          //   width : '200px'
          //   // sort : false,
          // },
          pendingForVerify : {
            title : "Pending for verify",
            width : '138px'
            // sort : false,
          },
          pendingForApprove : {
            title : "Pending for approve",
            width : '138px'
            // sort : false,
          }
        },
        delete: {
          deleteButtonContent: '<button>View</button>',
          mode: 'external'
        }
    }
}