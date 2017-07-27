import React, { Component } from 'react';

class DateAndTimeClock extends Component {
  constructor() {
    super()
    this.state = {
      clock: ''
    }
    this.getClock = this.getClock.bind(this)
  }
  componentWillMount() {
    this.setState({
      clock: this.getClock()
    })
  }

  componentDidMount() {
    let interval = setInterval(() => {
      this.setState({
        clock: this.getClock()
      })
    }, 1000)

    this.setState({
      interval: interval
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  getClock() {
    const tday=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
    const tmonth=new Array("January","February","March","April","May","June","July","August","September","October","November","December");
    let d=new Date();
    let nday=d.getDay(),nmonth=d.getMonth(),ndate=d.getDate(),nyear=d.getFullYear();
    let nhour=d.getHours(),nmin=d.getMinutes(),nsec=d.getSeconds(),ap;

    if(nhour==0){ap=" AM";nhour=12;}
    else if(nhour<12){ap=" AM";}
    else if(nhour==12){ap=" PM";}
    else if(nhour>12){ap=" PM";nhour-=12;}

    if(nmin<=9) nmin="0"+nmin;
    if(nsec<=9) nsec="0"+nsec;
    // this.setState({
    //   clock: ""+tday[nday]+", "+tmonth[nmonth]+" "+ndate+", "+nyear+" "+nhour+":"+nmin+":"+nsec+ap+""
    // })
    return ""+tday[nday]+", "+tmonth[nmonth]+" "+ndate+", "+nyear+" "+nhour+":"+nmin+":"+nsec+ap+""
  }
  render() {
    return (
      <div>
        <span>{this.state.clock}</span>
      </div>
    );
  }
}

export default DateAndTimeClock;





{/* <script type="text/javascript">
tday=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
tmonth=new Array("January","February","March","April","May","June","July","August","September","October","November","December");

function GetClock(){
var d=new Date();
var nday=d.getDay(),nmonth=d.getMonth(),ndate=d.getDate(),nyear=d.getFullYear();
var nhour=d.getHours(),nmin=d.getMinutes(),nsec=d.getSeconds(),ap;

if(nhour==0){ap=" AM";nhour=12;}
else if(nhour<12){ap=" AM";}
else if(nhour==12){ap=" PM";}
else if(nhour>12){ap=" PM";nhour-=12;}

if(nmin<=9) nmin="0"+nmin;
if(nsec<=9) nsec="0"+nsec;
""+tday[nday]+", "+tmonth[nmonth]+" "+ndate+", "+nyear+" "+nhour+":"+nmin+":"+nsec+ap+"";
}

window.onload=function(){
GetClock();

}
</script>
<div id="clockbox"></div> */}
