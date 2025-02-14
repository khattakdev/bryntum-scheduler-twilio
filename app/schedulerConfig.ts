import { BryntumSchedulerProps } from "@bryntum/scheduler-react";


const schedulerConfig : BryntumSchedulerProps = {
  startDate        : new Date(2022, 2, 20, 6),
  endDate          : new Date(2022, 2, 20, 20),
  viewPreset       : 'hourAndDay',
  rowHeight        : 50,
  barMargin        : 5,
  multiEventSelect : true,
  resourceImagePath : 'users/',
  filterFeature : true,

  columns: [
    {
      type: "resourceInfo",
      text: "Name",
      field: "name",
      minWidth: 190
    },
    {
      text : 'City',
      field : 'city',
      flex : 1,
    }
    
  ],

  tbar : {
    items : [
      {
        type: "widget",
        cls: "widget-title",
        html: "Events Scheduler",
        flex: 1,
      },
      {
        type : 'button',
        color : 'b-orange',
        text : 'Add event',
        icon : 'b-fa b-fa-plus',
        onClick : () => {
          // TODO: add new event
          console.log('Add event clicked');
        }
      },
    ]
  },

  crudManager : {
      transport : {
          load : {
              url : 'data.json'
          }
      },
      autoLoad : true
  }
};

export { schedulerConfig };
/*

const schedulerConfig: BryntumSchedulerProps = {
  startDate: new Date(2024, 2, 21, 6),
  endDate: new Date(2024, 2, 21, 20),

  treeFeature : true,

  eventEditFeature : {
    // Add an extra combo box to the editor to select equipment
    items : {
        equipmentCombo : {
            type         : 'combo',
            editable     : false,
            multiSelect  : false,
            valueField   : 'city',
            displayField : 'city',
            name         : 'city',
            label        : 'city',
            items        : ['London', 'New York', 'Barcelona', 'Rome']
        }
    },
    onBeforeSave : ( eventRecord ) => {
      console.log(eventRecord.id);
      console.log(eventRecord.name);
        // Prevent saving if no city is selected
        // if (!eventRecord.city) {
        //     alert('Please select a city');
        //     return false;
        // }
    }
  },

  viewPreset: "hourAndDay",
  eventStyle: "border",
  resourceImagePath : 'users/',


  columns: [
    {
      type: "resourceInfo",
      text: "Name",
      field: "name",
      minWidth: 190,
      // flex: 1,
      showMeta : user => StringHelper.xss`Hosting in ${user?.city}`
    },
    
  ],


  tbar : {
    items : [
      {
        type: "widget",
        cls: "widget-title",
        html: "Events Scheduler",
        flex: 1,
      },
      {
        type : 'button',
        color : 'b-orange',
        text : 'Add event',
        icon : 'b-fa b-fa-plus',
        onClick : () => {
          // TODO: add new event
          console.log('Add event clicked');
        }
      },
    ]
  },
  stripeFeature: true,
  dependenciesFeature: true,
};

export { schedulerConfig };
*/