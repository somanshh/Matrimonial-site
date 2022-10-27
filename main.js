$(document).ready(function(){
    $('.header').height($(window).height());
  })

  localStorage.removeItem("answers");
  var questions_string = localStorage.getItem("questions");
  var questions_json = JSON.parse(questions_string);
  // console.log(questions_json.data.length);
  var ques_n = 0;
  
  var list = document.getElementById("ques_list");
  var ques_div = document.getElementById("ques_div");
  var option_div = document.getElementById("option_div");
  var span1 = document.getElementById("span1");
  var span2 = document.getElementById("span2");
  var span3 = document.getElementById("span3");
  var span4 = document.getElementById("span4");
  var spans = document.getElementsByClassName("spans");
  
  for(var i=0; i<questions_json.data.length; i++){
      var list_ele = document.createElement("li");
      list_ele.style.display="inline-block";
      var text = document.createTextNode(i+1);
      list_ele.value = i;
      list_ele.className = "lii";
      list_ele.appendChild(text);
      // console.log(list_ele.value);
      list.appendChild(list_ele);
  }
  
  document.getElementsByClassName('lii')[0].style.border = "solid 2px white";
  
  var txt = document.createTextNode(questions_json.data[ques_n].question);
  var para = document.createElement("p");
  para.appendChild(txt);
  ques_div.innerHTML = "";
  ques_div.appendChild(para);
  
  span1.innerHTML = "";
  span2.innerHTML = "";
  span3.innerHTML = "";
  span4.innerHTML = "";
  let op1 = document.createTextNode(questions_json.data[ques_n].op1)
  let op2 = document.createTextNode(questions_json.data[ques_n].op2)
  let op3 = document.createTextNode(questions_json.data[ques_n].op3)
  let op4 = document.createTextNode(questions_json.data[ques_n].op4)
  span1.appendChild(op1);
  span2.appendChild(op2);
  span3.appendChild(op3);
  span4.appendChild(op4);
  
  
  $("li.lii").click(function(){
      for(var i=0; i<questions_json.data.length; i++){
          var lisst = document.getElementsByClassName('lii')[i];
          lisst.style.border = "none";
      }
      (this).style.border = "solid 2px white"
      ques_n = (this).value;
      var txt = document.createTextNode(questions_json.data[ques_n].question);
      var para = document.createElement("p");
      para.appendChild(txt);
      ques_div.innerHTML = "";
      ques_div.appendChild(para);
  
      span1.innerHTML = "";
      span2.innerHTML = "";
      span3.innerHTML = "";
      span4.innerHTML = "";
      let op1 = document.createTextNode(questions_json.data[ques_n].op1)
      let op2 = document.createTextNode(questions_json.data[ques_n].op2)
      let op3 = document.createTextNode(questions_json.data[ques_n].op3)
      let op4 = document.createTextNode(questions_json.data[ques_n].op4)
      span1.appendChild(op1);
      span2.appendChild(op2);
      span3.appendChild(op3);
      span4.appendChild(op4);
  
      for(var i=0; i<4; i++){
          var old_div = document.getElementsByClassName('option_divs')[i];
          old_div.style.border = "solid 1px black";
      }
  
      for(var i=0; i<4; i++){
          var old_inp = document.getElementsByClassName('inpp')[i];
          old_inp.checked = false;
      }
  
      if(questions_json.data[ques_n].opp_div != ""){
          let div_id = questions_json.data[ques_n].opp_div;
          var div = document.getElementById(div_id);
          div.style.border = "solid 3px black";
          div.children[0].checked = true; 
      }
  
  })
  
  var answers = {
      1:"",
      2:"",
      3:"",
      4:"",
      5:"",
      6:"",
      7:"",
      8:"",
      9:"",
      10:"",
  }
  
  
  $("div.option_divs").click(function(){
      let div_id = (this).id;
      questions_json.data[ques_n].opp_div = div_id;
      var div = document.getElementById(div_id);
      for(var i=0; i<4; i++){
          var old_div = document.getElementsByClassName('option_divs')[i];
          old_div.style.border = "solid 1px black";
      }
      var inp = div.children[0];
      inp.checked = true;
      div.style.border = "solid 3px black";
      let q = ques_n+1;
      answers[q] = div_id;
  })
  
  var submit_flag = false;
  
  $("#submit_btn").click(function(){
      let ss = JSON.stringify(answers);
      localStorage.setItem("answers", ss);
  })
  
  
  $("#submit_btn").click(function(){
      if(!submit_flag){
          var correct_str = localStorage.getItem("correct_answers");
          var correct_json = JSON.parse(correct_str);
  
          var ans = localStorage.getItem("answers");
          var ans_json = JSON.parse(ans);
  
          var count=0;
  
          for(var i=0; i<10; i++){
              if(correct_json[i+1] == ans_json[i+1]){
                  count++;
              }
          }
  
          var info_str = localStorage.getItem("info");
          var info_json = JSON.parse(info_str);
  
          let txt = document.createTextNode(info_json.fname+" "+info_json.lname+"'s Score: "+count+"/10");
          var para = document.createElement("p");
          var divv = document.getElementById('score');
          para.appendChild(txt);
          divv.appendChild(para);
          document.getElementById('score_outer').style.display = "flex";
          submit_flag = true;
      }
  })
  
  let time = 1;
  let quizTimeInMinutes = time * 60 * 60;
  let quizTime = quizTimeInMinutes / 60;
  
  let counting = document.getElementById("count-down");
  
  function startCountdown(){
      let quizTimer = setInterval(function(){
      if(quizTime <= 0) {
          clearInterval(quizTimer);
          $("#submit_btn").click();
      } else {
          quizTime--;
          let sec = Math.floor(quizTime % 60);
          let min = Math.floor(quizTime / 60) % 60;
          document.getElementById("timmer").innerHTML = `TIME: ${min} : ${sec}`;   
      }
  },1000);
  }
  startCountdown();