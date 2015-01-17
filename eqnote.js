 $(function(){
    var elements = [];
    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    canvas.onmousedown = function(e) {
        if (document.activeElement.tagName !== "TEXTAREA"){
            var startx = e.layerX;
            var starty = e.layerY;
            var x = startx;
            var y = starty;
                canvas.onmousemove = function(e) {
                    ctx.beginPath();
                    ctx.moveTo(x,y);
                    //x = e.pageX-pos(canvas).left;
                    //y = e.pageY-pos(canvas).top;
                    x= e.layerX;
                    y=e.layerY;
                    ctx.lineTo(x,y);
                    ctx.stroke();
                };
            canvas.onmouseup = function(e) {
                canvas.onmousemove=null;
                if (e.layerX==startx &&
                   e.layerY==starty)
                {
                    enableTextEntry(startx+8, starty+30);
                }
            };
            $(window).keydown(function(e) {
                var key = e.which;
                if (key===46){
                    //delete
                    $("textarea:focus").remove();
                    //also delete associated draggable somehow
                }
            });
        }
        else {
            if ($("textarea:focus").val()==="") {
                $("textarea:focus").remove();
                //also delete associated draggable somehow
            }
        }
    };

    function enableTextEntry(x, y) {
        var wrapper = $("#wrapper");
        var elemValue = $("#elemValue");
        var num = $(elemValue).attr("value");
        $(elemValue).attr("value", parseInt(num)+1);
        var draggable = document.createElement("div");
        $(draggable).attr("id", "draggable");
        $(draggable).attr("class", "ui-widget-content");
        $(draggable).attr("style", "left: "+x+"px; top: "+y+"px; width:105px; height:25px; padding: .5em;");
        var newTextBox = document.createElement("textarea");
        $(newTextBox).attr("style", "width:100px; height:20px;");
        $(newTextBox).attr("id", "text"+num+"");
        $(newTextBox).attr("name", "text"+num+"");
        $(newTextBox).on("change", function() {
            var text = $(newTextBox).val();
            $(newTextBox).hide();
            var mathDiv = document.createElement("div");
            $(mathDiv).append(text);
            $(mathDiv).css("font-weight","Bold");
            $(mathDiv).appendTo(draggable);
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
            $(mathDiv).on("click", function() {
                $(mathDiv).hide();
                //what happens to old mathdivs? don't want a bunch of old hidden stuff
                $(newTextBox).show();
                //maybe create object that only shows mathdiv or textbox at a time and syncronizes content
            });
        });
        $(newTextBox).appendTo(draggable);
        $(draggable).appendTo(wrapper);
        $("#text"+num+"").focus();
        $("#draggable").draggable();
        $("#draggable").draggable("option", "cursor", "move");
        elements.push(newTextBox);
    }

    function pos(el) {
        var position = {left: 0, top: 0};
        if (el) {
            if (!isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
                position.left += el.offsetLeft;
                position.top += el.offsetTop;
            }
        }
        return position;
     }

 });