var appUrl=window.location.origin;

document.addEventListener("DOMContentLoaded", function(){
    //------------APPENDING ELEMENTS-----------
    var options=pollData.polloptions
    $("title").html(pollData.pollname)
    $(".pollTitle").html(pollData.pollname)
   
    var sumVotes=0;
    var arrayOfVotes=[];
    var arrayOfOptions=[]
    options.forEach(function(val){
        sumVotes+=val.votecount;
        arrayOfVotes.push(val.votecount)
        arrayOfOptions.push(val.optname)
    })
    
    options.forEach(function(val){
        var optclass=val.optname.split(" ").join("")
        var w1=(val.votecount ==0)? 0:(val.votecount/sumVotes*100);
        $(".pollOptions").append("<div class=\"opt-container\"><div class=\"opt "+ optclass+"\">"+val.optname+": <span>"+w1.toFixed(2)+ "%</span></div><button class=\"b noDisplay remove-"+optclass+"\">x</button></div>")
        
        var opttoRemove={"pollid": pollData.id, "option": val.optname}
        
        $(".remove-"+optclass).on("click",function(val){
            $.post(appUrl+'/removeOption',opttoRemove,function(){
                location.reload(true)
            })
        })
        //--------VOTING LISTENER---------------
        var vote={"pollName": pollData.pollname, "polloption": val.optname, "id": pollData.id}
        $("."+optclass).on("click",function(){
            if(currentUser=="nl"){
                alert("You need to log in to vote!")
                return;
            }
            $.get(appUrl+'/vote', function(data){
                if (data.who!=currentUser || data.pollname!=pollData.pollname){
                    $.post(appUrl+'/vote',vote, function(){ 
                    location.reload(true)
                    })
                }    
                else{
                    alert('You already voted!')
                    return;
                }
            })
        })
        //--------------------------------
    })
    //----------ADD OPTION FORM---------------
    if(pollData.user== currentUser || currentUser=='Akademskig'){
        $(".buttDiv").removeClass('noDisplay')
        $(".b").removeClass('noDisplay')
    }
    
    $(".showForm").on("click",function(){
        if($("#addOpt").hasClass("noDisplay")){
            $("#addOpt").removeClass('noDisplay')
        }
        else
            $("#addOpt").addClass('noDisplay')
    })
   
    //--------CHART------------
    var margin={"top":20, "right": 20, "bottom": 40, "left": 40};
    var chartHeight=300;
    var chartWidth=350;
    var svgHeight=chartHeight+margin.top+margin.bottom
    var svgWidth=chartWidth+margin.left+margin.right
    var barWidth=chartWidth/arrayOfVotes.length
    
    var xScaleTicks=[];
    
        arrayOfOptions.forEach(function(val,i){
            xScaleTicks.push(barWidth/2+i*barWidth)
        })
    
     var yScale = d3.scaleLinear()
        .domain([sumVotes,0])
        .range([0, chartHeight])
    
     var xScale = d3.scaleBand()
        .domain(arrayOfOptions)
        .range([0,chartWidth])
        //.padding([0.2])
        
        
        var xAxis= d3.axisBottom(xScale).ticks(arrayOfOptions.length)
        var yAxis= d3.axisLeft(yScale).ticks(sumVotes) 
        
    
    
    var chart=d3.select('.chart')
        .style("background-color", "white")
        
    chart.selectAll("rect.bar")
    .data(arrayOfVotes)
    .enter()
    .append("rect")
    .attr('width', barWidth)
    .attr('height', function(d,i){
        return d/sumVotes*chartHeight;
    })
    .attr('x', function(d,i){
      return (chartWidth/arrayOfVotes.length)*(i)+margin.left})
    .attr('y', function(d,i){
      return chartHeight - d/sumVotes*chartHeight+margin.top;
    })
    .attr("fill", function(d) {
        while(d>10){
            d=d-10;
        }
        if (d <= 2) {
          return "red";
        } else if (d > 2 && d <=4) {
          return "orange";
        }
        else if(d >4 && d <=6){
        return "yellow";
        }
        else if(d>6 && d <=8){
            return "blue";
        }
        else if(d >8 && d <=10){
            return "purple"
        }
      }) 
    
    var posXAx=svgHeight-margin.bottom;
    
     chart.append("g")
        .attr("class", "axis")
        .attr("transform", "translate("+margin.left+","+posXAx+")")
        .call(xAxis)
        .selectAll('text')
            .attr('dy',0.71)
            .call(wrap, xScale.bandwidth())
            
    chart.append("g")
        .attr("class", "axis")
        .attr("transform", "translate("+margin.left+","+margin.top+")")
        .call(yAxis)
        
    var xAxisWidth=0   
    
    function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        var fontSize=$(".axis").attr('font-size')
        xAxisWidth=lineNumber*(lineHeight+0.25)*fontSize;
      }
     
    }
  });
  var totalHeight;
  if(xAxisWidth == undefined){
      totalHeight= svgHeight;
  }
  else{
      totalHeight=svgHeight +xAxisWidth
  }
  console.log(xAxisWidth)
  chart.attr('width',svgWidth)
        .attr('height',totalHeight)
}

})


