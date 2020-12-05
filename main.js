textForm = {
  template: `
    <div class="form-group">
        <label for='id'>{{labelText}}</label>
        <input
            type="text"
            class="form-control"
            v-model='inputText'
            :id='id'
            @change='inputChange'
        />
    </div>
    `,
  data() {
    return {
      inputText: undefined,
    };
  },
  components: {},
  props: {
    id: {
      type: String,
      required: true,
    },
    labelText: {
      type: String,
      required: true,
    },
  },
  methods: {
    inputChange() {
      this.$emit("input-change", { data: this.inputText, sender: this.id });
    },
    clear() {
      this.inputText = undefined;
    },
  },
  created() {
    this.$parent.$on("send", this.clear);
  },
};

selectFormNumlist = {
  template: `
  <div class="form-inline">
    <div class="form-group">
      <label for='id' class="mr-2">{{labelText}}</label>
          <select :id='id' class="form-control" v-model='inputSelect' @change='inputChange'>
            <option v-for='n in range(0,size,step)' :value=n>{{n}}</option>
          </select>
    </div>
  </div>
  `,
  data() {
    return {
      inputSelect: undefined,
    };
  },
  components: {},
  props: {
    id: {
      type: String,
      required: true,
    },
    labelText: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    step: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    range(min, max, step) {
      let array = [],
        j = 0;
      for (var i = min; i <= max; i = i + step) {
        array[j] = i;
        j++;
      }
      return array;
    },
    inputChange() {
      this.$emit("input-change", { data: this.inputSelect, sender: this.id });
    },
    clear() {
      this.inputSelect = undefined;
    },
  },
  created() {
    this.$parent.$on("send", this.clear);
  },
};

selectFormText = {
  template: `
    <div class="form-group">
      <label for='id'>{{labelText}}</label>
          <select :id='id' class="form-control" v-model='inputSelect' @change='inputChange'>
            <option v-for='option in options' :value=option>{{option}}</option>
          </select>
    </div>
  `,
  data() {
    return {
      inputSelect: undefined,
    };
  },
  components: {},
  props: {
    id: {
      type: String,
      required: true,
    },
    labelText: {
      type: String,
      required: true,
    },
    options: {
      required: true,
    },
  },
  methods: {
    inputChange() {
      this.$emit("input-change", { data: this.inputSelect, sender: this.id });
    },
    clear() {
      this.inputSelect = undefined;
    },
  },
  created() {
    this.$parent.$on("send", this.clear);
  },
};

selectFormTime = {
  template: `
    <div class="form-group">
    <label for=id>{{labelText}}</label>
    <input
      type="time"
      id=id
      class="form-control"
      v-model=inputSelect
      @change=inputChange
    />
    </div>
  `,
  data() {
    return {
      inputSelect: undefined,
    };
  },
  components: {},
  props: {
    id: {
      type: String,
      required: true,
    },
    labelText: {
      type: String,
      required: true,
    },
  },
  methods: {
    inputChange() {
      this.$emit("input-change", { data: this.inputSelect, sender: this.id });
    },
    clear() {
      this.inputSelect = undefined;
    },
  },
  created() {
    this.$parent.$on("send", this.clear);
  },
};

submitButton = {
  template: `
  <button
    type="button"
    class="btn btn-primary"
    
    @click="handleClick"
    >
    Add
    <i class="material-icons">keyboard_arrow_down</i>
  </button>
  `,
  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
};

badge = {
  template: `<span class="mr-2"><span class="badge badge-dark">{{text}}</span></span>`,
  props: {
    text: {
      type: String,
      reqired: true,
    },
  },
};

closeButton = {
  template: `
    <button type="button" class="btn btn-danger btn-sm btn-xs" @click=clickClose>
    <span class="material-icons">close</span>
    </button>
  `,
  methods: {
    clickClose() {
      this.$emit("click");
    },
  },
};

listItem = {
  template: `
    <li class="list-group-item d-flex">
      <span class="mr-auto">{{item.name}}</span>
      <badge v-if='timedisplay=="single"' :text='badgeText'></badge>
      <close-button @click=close></close-button>
    </li>
  `,
  components: {
    badge,
    closeButton,
  },
  props: {
    item: {
      required: true,
    },
    timedisplay: {
      type: String,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit("close", this.item.id);
    },
  },
  computed: {
    badgeText() {
      let hours = this.item.time.hours.toString();
      if (hours == "NaN") {
        hours = "0";
      }
      let minutes = this.item.time.minutes.toString();
      if (minutes == "NaN") {
        minutes = "0";
      }
      return hours + "h " + minutes + "m";
    },
  },
};

mainList = {
  template: `
    <ul class="list-group" :id=id>
      <list-item @close=close v-for='task in itemlist' :key=task.id :item=task timedisplay="single"></list-item>
    </ul>`,
  data() {
    return {};
  },
  components: {
    listItem,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    itemlist: Array,
  },
  methods: {
    close(itemid) {
      this.$emit("remove", { id: itemid, sender: this.id });
    },
  },
};

simpleList = {
  template: `
    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-for='item in items'>{{item.name}}</li>
    </ul>
  `,
  props: {
    items: {
      reqired: true,
      type: Array
    }
  },
}

card = {
  template: `
    <div class="card">
      <div class="card-header d-flex">
       <span class="mr-auto">
          {{struct.name}}
        </span>
       <close-button @click=close></close-button>
      </div>
      <simple-list :items=struct.timeblocks></simple-list>
    </div>
  `,
  // TODO add close button
  components: {
    simpleList,
    closeButton
  },
  data() {
    return {
      
    }
  },
  props: {
    struct: {
      type: DayStructure,
      required: true 
    },
  },
  methods: {
    close() {
      console.log("%cyeet", "color:red")
    }
  },
}

formElement = {
  //NOTE redundent
  template: `
    <div>
      <text-form 
        v-if="this.id=='taskform'" 
        id="taskname" label-text="Task Name" 
        @input-change='update'
      ></text-form>
      <select-form 
        v-if="this.id=='taskform'" 
        id="hours" 
        label-text="Hours" 
        :size='6' 
        @input-change='update'
      ></select-form>
      <select-form 
        v-if="this.id=='taskform'" 
        id="minutes" label-text="Minutes" 
        :size='59' 
        :step='5' 
        @input-change='update'
      ></select-form>
      <br />
      <submit-button @click=handleClick></submit-button>
    </div>
  `,
  data() {
    return {
      container: {},
    };
  },
  components: {
    textForm,
    selectFormNumlist,
    submitButton,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  created() {
    if (this.id == "taskform") {
      this.container = {
        taskname: undefined,
        hours: undefined,
        minutes: undefined,
      };
    }
    if (this.id == "timeblocksform") {
      this.container = {
        timeblocktype: undefined,
        start: undefined,
        end: undefined,
      };
    }
  },
  methods: {
    update(inputObj) {
      this.container[inputObj.sender] = inputObj.data;
    },
    handleClick() {
      if (this.id == "taskform") {
        if (
          this.container.taskname &&
          (this.container.hours || this.container.minutes)
        ) {
          let createTask = new Task(
            this.container.taskname,
            new Time(this.container.hours, this.container.minutes)
          );
          this.$emit("task", createTask);
          this.container = {
            taskname: undefined,
            hours: undefined,
            minutes: undefined,
          };
        } else {
          console.log("empty fields");
        }
      }
      if (this.id == "timeblocksform") {
      }
    },
  },
};

cardList = {
  template: `
    <div>
      <card v-for='struct in daystructs' :key=struct.id :struct=struct></card>
    </div>
  `,
  props: {
    daystructs: {
      type: Array,
      required: true
    },
  },
  components: {
    card,
  },

}

daystrucform = {
  template: `
    <div>
      <text-form id="name" labelText="Day structure name" @input-change=update></text-form>
      <submit-button @click=handleClick></submit-button>
    </div>
  `,
  data() {
    return {
      container: {
        name: undefined
      }
    }
  },
  components: {
    textForm,
    submitButton,
  },
  methods: {
    update(inputObj) {
      this.container[inputObj.sender] = inputObj.data;
    },
    handleClick(){
      if(this.container.name) {
        this.$emit('send', this.container.name)
      }
    }
  },
}

taskform = {
  template: `
    <div>
      <text-form  
        id="taskname" label-text="Task Name" 
        @input-change='update'
      ></text-form>
      <select-form-numlist  
        id="hours" 
        label-text="Hours" 
        :size='6' 
        @input-change='update'
      ></select-form-numlist>
      <select-form-numlist  
        id="minutes" label-text="Minutes" 
        :size='59' 
        :step='5' 
        @input-change='update'
      ></select-form-numlist>
      <br />
      <submit-button @click=handleClick></submit-button>
    </div>
  `,
  data() {
    return {
      container: {
        taskname: undefined,
        hours: undefined,
        minutes: undefined,
      },
    };
  },
  components: {
    textForm,
    selectFormNumlist,
    submitButton,
  },

  methods: {
    update(inputObj) {
      this.container[inputObj.sender] = inputObj.data;
    },
    handleClick() {
      if (
        this.container.taskname &&
        (this.container.hours || this.container.minutes)
      ) {
        let createTask = new Task(
          this.container.taskname,
          new Time(this.container.hours, this.container.minutes)
        );
        this.$emit("send", createTask);
        this.container = {
          taskname: undefined,
          hours: undefined,
          minutes: undefined,
        };
      } else {
        console.log("empty fields");
      }
    },
  },
};

timeblocksform = {
  template: `
    <div>
      <select-form-time  
        id="start" 
        label-text="Start time" 
        @input-change='update'
      ></select-form-time>
      <select-form-time  
        id="end" 
        label-text="End time" 
        @input-change='update'
      ></select-form-time>
      <select-form-text  
        id="type" 
        label-text="Type"  
        @input-change='update'
        :options=options
      ></select-form-text>
      <br />
      <submit-button @click=handleClick></submit-button>
    </div>
  `,
  data() {
    return {
      container: {
        start: undefined,
        end: undefined,
        type: undefined,
      },

      options: ["Awesome", "Normal"],
    };
  },
  components: {
    selectFormText,
    selectFormTime,
    submitButton,
  },

  methods: {
    update(inputObj) {
      this.container[inputObj.sender] = inputObj.data;
    },
    handleClick() {
      if (
        this.container.start &&
        this.container.end &&
        this.container.type &&
        timeStringToNumber(this.container.end) >
          timeStringToNumber(this.container.start)
      ) {
        let createblock = new Timeblock(
          timeStringToObject(this.container.start),
          timeStringToObject(this.container.end),
          this.container.type
        );
        this.$emit("send", createblock);
        this.container = {
          start: undefined,
          end: undefined,
          type: undefined,
        };
      } else {
        console.log("empty fields");
      }
    },
  },
};

window.app = new Vue({
  el: "#app",
  template: `
    <div>
        <div class="jumbotron"><h3>Task Scheduler</h3></div>
        <div class="row">
            <div class="col-md-4">
              <h5>Enter task</h5>
              <taskform @send=storeTask></taskform>
              <hr />
              <h5>Task list</h5>
              <main-list id="tasks" :itemlist=tasks @remove=remove></main-list>
            </div>
            <div class="col-md-4">
              <h5>Enter timeblocks</h5>
              <timeblocksform @send=storeTimeblock></timeblocksform>
              <hr />
              <h5>Timeblocks</h5>
              <main-list id="timeblocks" :itemlist=timeblocks @remove=remove></main-list>
              <hr />
              <h5>Create day structure</h5>
              <daystrucform @send=createDaystruc></daystrucform>
            </div>
            <div class="col-md-4">
              <card-list :daystructs=daystructs></card-list>
            </div>
        </div>
    </div>
    `,
  data: function () {
    return {
      tasks: [],
      timeblocks: [],
      daystructs: [],
    };
  },

  components: {
    mainList,
    taskform,
    timeblocksform,
    cardList,
    daystrucform,
  },
  methods: {
    storeTask(task) {
      this.tasks.push(task);
    },
    storeTimeblock(timeblock) {
      this.timeblocks.push(timeblock);
    },
    createDaystruc(name) {
      if (this.timeblocks.length>0){
        let daystruc = new DayStructure(name, _.clone(this.timeblocks))
        this.daystructs.push(daystruc)
        this.timeblocks.splice(0,this.timeblocks.length)
      }
    },
    remove(obj) {
      let list = this.$data[obj.sender];
      for (i = 0; i < list.length; i++) {
        if (list[i].id == obj.id) {
          list.splice(i, 1);
        }
      }
    },
  },
});

/* -------------------------------------------------------------------------- */
/*                             Object definitions                             */
/* -------------------------------------------------------------------------- */
// SECTION Object Definitions
function Task(name, timeobj, urgency = 0, repeat = 0) {
  this.name = name;
  this.created = new Date();
  this.id = generate();
  this.time = timeobj;
  this.urgency = urgency;
  this.scheduled = false;
  this.repeat = repeat;
  this.completed = false;
}

function Timeblock(startTime, endTime, type) {
  this.id = generate();
  this.startTime = startTime;
  this.endTime = endTime;
  this.name = type;
  this.time = timeDifference(this.startTime, this.endTime);
  this.tasks = [];
  this.availableTime = timeDifference(this.startTime, this.endTime);
}

function DayStructure(name, timeblocks) {
  this.name = name;
  this.id = generate();
  this.timeblocks = timeblocks;
}
// NOTE testing lodash clone
function Day(name, daystructure) {
  this.name = name;
  this.id = generate();
  this.date = new Date();
  this.timeblocks = _.cloneDeep(daystructure.timeblocks);
}

function Time(hours, minutes) {
  this.hours = Number(hours);
  this.minutes = Number(minutes);
  this.timeAmount = this.hours * 60 + this.minutes;
}

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function idGenerator() {
  // NOTE cannot create more than 99 ids in one milisecond
  let id = 0;

  return function () {
    return Date.now().toString() + (id++).toString().padStart(2, "0");
  };
}
generate = idGenerator(); //closure initialization

function timeDifference(time1, time2) {
  let larger;
  let smaller;
  if (time1.hours * 100 + time1.minutes > time2.hours * 100 + time2.minutes) {
    larger = time1;
    smaller = time2;
  } else {
    larger = time2;
    smaller = time1;
  }

  let newhours = larger.hours - smaller.hours;
  let newminutes = larger.minutes - smaller.minutes;
  if (newminutes < 0) {
    newhours--;
    newminutes = 60 + newminutes;
  }
  return new Time(newhours, newminutes);
}

function createTimeblocks(daystructure) {
  let timeblocksArray = [];
  for (timeblock of daystructure.timeblocks) {
    timeblocksArray.push(
      new Timeblock(timeblock.startTime, timeblock.endTime, timeblock.type)
    );
  }
  return timeblocksArray;
}

function timeStringToObject(timestring) {
  let timeObj = new Time(timestring.slice(0, 2), timestring.slice(-2));
  return timeObj;
}

function timeStringToNumber(timestring) {
  let newstring = timestring.slice(0, 2) + timestring.slice(3);
  return Number(newstring);
}
//!SECTION
