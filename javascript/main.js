// https://jsdoc.app/

// TODO: documentation.

/**
 * Update the slide show.
 * @param {string} str - element you would like to update.
 * @param {integer} index - Index to render.
 */
function slideShow(str, index) {
	$(str).hide();
	$(str + ":eq(" + index + ")").show();
}

function init(index) {
	slideShow("ul.rain li", index);
	slideShow("ul.snow li", index);
	slideShow("ul.hail li", index);
	slideShow("ul.tornados li", index);
	slideShow("ul.hurricanes li", index);
}

function toKPH(val) {
    // remove all non numbers so we dont get "NaN"
    val = val.replace(/[^0-9]+/,'');
	return Math.round(val / 1.60934) + `kph`;
}

function toMPH(val) {
    // remove all non numbers so we dont get "NaN"
    val = val.replace(/[^0-9]+/,'');
    return Math.round(val * 1.60934) + `mph`;
}

$(document).ready(function() {
    "use strict"
	
	const $nav = $("ul.nav"),
        $hamburger = $(".hamburger"),
		$preview = $("#preview"),
		$gallery = $("#gallery"),
		video_array = document.getElementsByTagName("video"),
        nums = document.getElementsByTagName("span");
	
	let index = 0,
        video_index = 0,
        click_index = 0;
	
	$nav.hide();
	
	$hamburger.click(function() {
        $nav.slideToggle("fast", function() {});
    });
	
    /* Resizes the "vh" and "vw" as the user
     * makes their browser smaller.
     */
	$(window).resize(function() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
	
	setInterval(function() {
		if (++index > 3)
			index = 0;
		
		init(index);
	}, 5000);
	
    video_array[0].onended = (event) => {
        ++video_index;
        slideShow("ul#videos li", video_index);
    };
    
    $("#unit").click(function() {
        ++click_index;
        
        if (click_index > 1) click_index = 0;
        
        if (click_index == 1) {
            $("#unit").html("Click to Switch to Imperial");
            for (var i = 0; i < nums.length; ++i) {
                nums[i].innerHTML = toKPH(nums[i].innerHTML);
            }
        } else {
            $("#unit").html("Click to Switch to Metric");
            for (var i = 0; i < nums.length; ++i) {
                nums[i].innerHTML = toMPH(nums[i].innerHTML);
            }
        }
    });
    
    video_array[1].onended = (event) => {
        video_index = 0;
        slideShow("ul#videos li", video_index);
    };
    
    for (var i = 0; i < nums.length; ++i) {
        nums[i].innerHTML += "mph";
    }
    
    slideShow("ul#videos li", video_index);
	init(index);
});
