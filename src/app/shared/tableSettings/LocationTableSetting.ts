export class LocationTableSetting{
    public static setting = {
        mode: 'external',
        //hideHeader : true,
        hideSubHeader: false,
        actions: {
          position: 'right',
          add: false,
          edit : false,
          delete : false,
          custom: [
            { name: 'editrecord', title: 'Edit'},
            // { name: 'activerecord', title: 'Active' },
            // { name: 'deactiverecord', title: 'Deactive' },
          ],
        },
        pager :{
          perPage : 10
        },
        columns: {
          locId: {
            title: 'Location Id',
            // sort : false,
            width : '100px'
          },
          locName: {
            title: 'Location name',
            // sort : false,
          },
          geoCoordinate: {
            title: 'Geo-coordingate ?',
            sort : false,
            class : "info location_GeoCoordinate"
          },
          // latitude: {
          //   title: 'Latitude'
          // },
          // longitude: {
          //   title: 'Longitude'
          // }
        }
    }
}