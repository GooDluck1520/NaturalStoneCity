jQuery(document).ready(function() {
	"use strict";
	
  /* Navigation */	
  jQuery('.main-nav a:not(.dropdown-toggle)').bind('click', function(event) {
  		var $anchor = $(this);
  		jQuery('html, body').stop().animate({
  			scrollTop: $($anchor.attr('href')).offset().top
  		}, 1500, 'easeInOutExpo');
  		event.preventDefault();
  	});

  /* Count */	
  jQuery('.st-ff-count').appear();
  	jQuery(document.body).on('appear', '.st-ff-count', function(e, $affected) {
  		$affected.each(function(i) {
  			if (parseInt($(this).data('runit'))) {
  				$(this).countTo({
  					speed: 3000,
  					refreshInterval: 50
  				});
  				$(this).data('runit', "0");
  			};

  		});
  	});

  /* tooltip */	
  jQuery('[data-toggle="tooltip"]').tooltip();

  /* Clients */
  jQuery('.clients-carousel').owlCarousel({
      	items: 5,
      	autoPlay: true,
      	pagination: false
      });

  /* Contact Form */	
  jQuery('.contact-form').submit(function () {
        var $this = $(this),
            result = true;

        if(!checkEmpty($this.find('#fname'))){
          result=false;
        }
        if(!validateEmail($this.find('#email'))) {
          result=false;
        }
        if(!checkEmpty($this.find('#mssg'))) {
          result=false;
        }
        
        if(result==false) {
          return false;
        }

        var $btn = $("#send").button('loading');

        var data = $this.serialize();

        $.ajax({
            url: "sender.php", 
            type: "POST",        
            data: data,     
            cache: false,
            success: function (html) {
            	console.log(html);
                if (html==1) {
                    $('#result-message').addClass('alert alert-success').html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Success!</strong> Message Send. We will contact with you soon.').delay(500).slideDown(500).delay(10000).slideUp('slow');

                    $btn.button('reset');
                    
                } else {
                    $('#result-message').addClass('alert alert-danger').html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Error!</strong> Message Sending Error! Please try again').delay(500).slideDown(500).delay(10000).slideUp('slow');
                    $btn.button('reset');
                }
            },
            error: function (a, b) {
              if (b == 'error') {
                $('#result-message').addClass('alert alert-danger').html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Error!</strong> Message Sending Error! Please try again').delay(500).slideDown(500).delay(10000).slideUp('slow');
              };
              $btn.button('reset');
            }
        });

        return false;
      });


  });

  /* Portfolio */	
  jQuery(window).load(function () {
  	var $grid = $('.grid'),
  		$sizer = $grid.find('.shuffle__sizer'),
  		$filterType = $('#filter input[name="filter"]');

  	$grid.shuffle({
  		itemSelector: '.portfolio-item',
  		sizer: $sizer
  	});

  	$filterType.change(function(e) {
  		var group = $('#filter input[name="filter"]:checked').val();

  		$grid.shuffle('shuffle', group);

  		$('label.btn-main').removeClass('btn-main');
  		$('input[name="filter"]:checked').parent().addClass('btn-main');
  	});
  	
  	
     function home_height () {
  		var element = $('.st-home-unit'),
  			elemHeight = element.height(),
  			winHeight = $(window).height()
  			padding = (winHeight - elemHeight - 200) /2;

  		if (padding < 1 ) {
  			padding = 0;
  		};
  		element.css('padding', padding+'px 0');
  	}
  	home_height ();

  jQuery(window).resize(function () {
  	home_height ();
  });

  	var fadeStart=$(window).height()/3 // 100px scroll or less will equiv to 1 opacity
      ,fadeUntil=$(window).height() // 200px scroll or more will equiv to 0 opacity
      ,fading = $('.st-home-unit')
      ,fading2 = $('.hero-overlayer')
  	;
  	
  /* Nav Scroll */	
  jQuery(window).bind('scroll', function(){
    var offset = $(document).scrollTop()
      ,opacity=0
      ,opacity2=1
    ;
    if( offset<=fadeStart ){
      opacity=1;
      opacity2=0;
    }else if( offset<=fadeUntil ){
      opacity=1-offset/fadeUntil;
      opacity2=offset/fadeUntil;
    }
    fading.css({'opacity': opacity});

    if (offset >= 120) {
      $('.st-navbar').addClass("st-navbar-mini");
    } else if (offset <= 119) {
      $('.st-navbar').removeClass("st-navbar-mini");
    }
  });

  /* Scroll Top */
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('.scrollTop').fadeIn();  
        $('.header').addClass('fixed');         
    } else {
        $('.scrollTop').fadeOut();
        $('.header').removeClass('fixed');            
    }
  });
  $('.scrollTop').click(function () {
    $("html, body").animate({
        scrollTop: 0
    }, 600);
    return false;
  });

});	
