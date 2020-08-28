let index = 0;
jQuery(document).ready(function($) {
    $("body").click(function(e) {
        let string_list = ["¤富强¤", "¤民主¤","¤文明¤", "¤和谐¤", "¤自由¤", "¤平等¤", "¤公正¤" ,"¤法治¤", "¤爱国¤", "¤敬业¤", "¤诚信¤", "¤友善¤"];
        let color_list = ["#ff3333", "#ff8000", "#f9f906", "#b9f20d", "#00ff00", "#00ff80", "#00ffff", "#007fff", "#0000ff", "#7f00ff", "#ff00ff", "#ff0080"];
        let string = $("<span/>").text(string_list[index]);
        let color = color_list[index];
        index= (index + 1) % string_list.length;
        let x = e.pageX, y = e.pageY;
        string.css({ "z-index": 99, "top": y - 20, "left": x, "position": "absolute", "font-weight": "bold", "color": color });
        $("body").append(string);
        string.animate({ "top": y - 180, "opacity": 0 }, 1500, function(){ string.remove(); });
    });
});
