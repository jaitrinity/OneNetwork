export class CheckpointTableSetting{
    public static setting = {
        mode: 'external',
        hideSubHeader: false,
        actions: {
          position: 'right',
          add: false,
          edit : false,
          delete : false
        },
        pager :{
          perPage : 10
        },
        columns: {
          checkpointId: {
            title: 'Chk Id',
            // sort : false,
            width : '70px'
          },
          description: {
            title: 'Description',
            // sort : false,
            width : '300px'
          },
          value: {
            title: 'Value',
            // sort : false,
          },
          typeName: {
            title: 'Type',
            // sort : false,
            width : '100px'
          },
          mandatory: {
            title: 'Mandatory',
            // sort : false,
            width : '100px'
          },
          editable: {
            title: 'Editable',
            // sort : false,
            width : '100px'
          },
          correct: {
            title: 'Correct',
            // sort : false,
            width : '100px'
          },
          size: {
            title: 'Size ?',
            sort : false,
            class : "info checkpoint_size",
            width : "70px"
          },
          score: {
            title: 'Score',
            // sort : false,
            width : "60px"
          },
          language: {
            title: 'Language',
            // sort : false,
            width : '100px'
          },
          dependent: {
            title: 'Dependent',
            // sort : false,
            width : '100px'
          },
          logic: {
            title: 'Logic ?',
            sort : false,
            class : "info checkpoint_logic"
          },
          // active: {
          //   title: 'Active'
          // }
        }
    }
}