// 20241002 LHI

var event = {
	navOpen: function(){
		$(document).on("click", ".rel_wrap > a",function(){
			$(this).parent().toggleClass('on');
			$(this).next('ul').slideToggle();
			return false;
		});
	},
	//popup open event
	popOpen: function(){
		
		
		$(document).on("click keydown", ".btn_layer",function(e){
			
			if (e.type === "keydown" && e.keyCode !== 13) return;
			
			$('a[data-focus~=on], button[data-focus~=on], li[data-focus~=on]').removeAttr('data-focus');
			$('html').css({'overflow': 'hidden', 'height': '100%'});
			var el = $(this);
			var id = $(this).data('id');
			$("."+ id +"").show().addClass('layer_open').attr({"tabindex": "0", "aria-hidden": "false" }).focus().css('outline','0');
			el.attr({"data-focus": "on", "aria-expanded": "true" });
			
		});
		$(document).on("click",".layer_wrap .btn_close",function(){
			//$(this).closest(".layer_wrap").hide().removeClass('layer_open').removeAttr("tabindex", "0");
			$(this).closest(".layer_wrap").hide().removeClass('layer_open').removeAttr("tabindex").attr("aria-hidden", "true");
			$('a[data-focus~=on], button[data-focus~=on], li[data-focus~=on]').focus().attr("aria-expanded", "false");
			if($(".layer_wrap.layer_open").length == 0){   
				$('html').css({'overflow': 'auto', 'height': 'auto'});
			}
		});
	
		/*$(document).on("click",".btn_layer",function(){
			$('a[data-focus~=on], button[data-focus~=on], li[data-focus~=on]').removeAttr('data-focus');
			$('html').css({'overflow': 'hidden', 'height': '100%'});
			var el = $(this);
			var id = $(this).data('id');
			$("."+ id +"").show().addClass('layer_open').attr("tabindex", "0").focus().css('outline','0');
			el.attr('data-focus','on');
			
		});
		$(document).on("click",".layer_wrap .btn_close",function(){
			//$(this).closest(".layer_wrap").hide().removeClass('layer_open').removeAttr("tabindex", "0");
			$(this).closest(".layer_wrap").hide().removeClass('layer_open').removeAttr("tabindex");
			$('a[data-focus~=on], button[data-focus~=on], li[data-focus~=on]').focus();
			if($(".layer_wrap.layer_open").length == 0){   
				$('html').css({'overflow': 'auto', 'height': 'auto'});
			}
		});*/
	},
	//tab click event
	// tabList: function(){
	// 	$(".tab_list > li").eq(0).addClass('on');
	// 	$(".tab_cont > div").eq(0).addClass('on');
	// 	$(document).on("click",".tab_list > li > a",function(){
	// 		var id = $(this).attr("href");
	// 		$(this).closest('li').siblings().removeClass('on');
	// 		$(this).closest('li').addClass('on');
	// 		$(">.tab_cont>div",$(this).closest(".tab_wrap")).hide();
	// 		$(">.tab_cont>div"+id,$(this).closest(".tab_wrap")).show();
	// 		return false;
	// 	});
	// },

	// tabList: function(){
	// 	$(".tab_wrap").each(function() {
	// 		var $wrap = $(this); // 현재 탭 래퍼
	// 		$wrap.find(".tab_list > li").eq(0).addClass('on');
	// 		$wrap.find(".tab_cont > div").eq(0).addClass('on').show();
	
	// 		$wrap.on("click", ".tab_list > li > a", function(e) {
	// 			e.preventDefault(); // 기본 동작 막기
	// 			var id = $(this).attr("href");
				
	// 			// 탭 상태 변경
	// 			$(this).closest('li').siblings().removeClass('on');
	// 			$(this).closest('li').addClass('on');
				
	// 			// 콘텐츠 상태 변경
	// 			$wrap.find(".tab_cont > div").hide();
	// 			$wrap.find(".tab_cont > div" + id).show();
	// 		});
	// 	});
	// },
	tabList: function() {
		$(".tab_wrap").each(function() {
			var $wrap = $(this); // 현재 탭 래퍼
			initTabs($wrap); // 초기화 함수 호출
			$('li[role="presentation"]').find('a').attr({'aria-selected': 'false', 'tabindex': '-1'});
	  		$('li[role="presentation"].on').find('a').attr({'title': '선택됨', 'aria-selected': 'true', 'tabindex': '0'});			
			

		  $wrap.on("click", ".tab_list > li > a", function(e) {
			e.preventDefault(); // 기본 동작 막기
			var id = $(this).attr("href"); // 연결된 콘텐츠 ID
			// 현재 탭이 이미 활성화되어 있으면 종료
			if ($(this).closest('li').hasClass('on')) {
			  return; // 더 이상 처리하지 않음
			}
	  		

			// 현재 탭 활성화 처리
			$(this).closest('li').siblings().removeClass('on').find('a').attr({'aria-selected': 'false', 'tabindex': '-1'}).removeAttr('title');
			$(this).closest('li').addClass('on').find('a').attr({'title': '선택됨', 'aria-selected': 'true', 'tabindex': '0'});
	  

			// 같은 탭 래퍼 내 콘텐츠 처리
			$wrap.find(".tab_cont > div").hide().attr('aria-hidden', 'true'); // 현재 래퍼의 모든 콘텐츠 숨기기
			$wrap.find(".tab_cont > div" + id).show().attr('aria-hidden', 'false'); // 선택한 콘텐츠 표시
	  		console.log($wrap.find(".tab_cont > div" + id));
			// 내부 탭 활성화 로직 추가
			if (id === "#tab1") {
			  var $innerTabWrap = $wrap.find("#tab1 .tab_wrap");
			  if ($innerTabWrap.length > 0) {
				// 내부 탭 초기화 및 첫 번째 탭 활성화
				$innerTabWrap.find(".tab_list > li").removeClass('on').eq(0).addClass('on');
				$innerTabWrap.find(".tab_cont > div").hide().eq(0).show();
			  }
			}
			if (id === "#tab2") {
				var $innerTabWrap = $wrap.find("#tab2 .tab_wrap");
				if ($innerTabWrap.length > 0) {
				  // 내부 탭 초기화 및 첫 번째 탭 활성화
				  $innerTabWrap.find(".tab_list > li").removeClass('on').eq(0).addClass('on');
				  $innerTabWrap.find(".tab_cont > div").hide().eq(0).show();
				}
			  }
		  });
		});
	  
		function initTabs($wrap) {
		  // 초기화: 첫 번째 탭과 콘텐츠 활성화
		  $wrap.find(".tab_list > li").eq(0).addClass('on');
		  $wrap.find(".tab_cont > div").hide(); // 모든 콘텐츠 숨기기
		  $wrap.find(".tab_cont > div").eq(0).show(); // 첫 번째 콘텐츠 표시
	  
		  // 내부 탭 초기화
		  $wrap.find(".tab_cont .tab_wrap").each(function() {
			var $innerWrap = $(this);
			$innerWrap.find(".tab_list > li").eq(0).addClass('on');
			$innerWrap.find(".tab_cont > div").hide().eq(0).show();
		  });
		}
	  },
	  
	
	gnb: function(){
		$(document).on("mouseenter focusin",".gnb",function(){
			$('.header').addClass('on');
			$(this).closest('li').siblings().removeClass('on')
			$(this).closest('li').addClass("on");
			return false;
		}).on("mouseleave",".header",function(){  
			$(this).removeClass('on');
			$('.gnb').find('li').removeClass("on");
			return false;
		}).on("focusout",function(){  
			$('.header').removeClass('on');
			return false;
		});
		// 접근성 추가
		$(document).on("focusin",".logo a, .btn_time",function(){
			$('.header').removeClass('on').find('li').removeClass("on");
			return false;
		});	
		
	},
	mobGnb: function(){
		$('.mob_menu_list .mob_2dpt > li').each(function () {
			if ($(this).find('.snb_depth3').length > 0) {
				$(this).children('a').addClass('has-sub'); // snb_depth3가 있으면 추가
			}
		
			// snb_depth3 내부에서 snb_depth4를 확인하여 has-sub 추가
			$(this).find('.snb_depth3 > li').each(function () {
				if ($(this).find('.snb_depth4').length > 0) {
					$(this).children('a').addClass('has-sub'); // snb_depth4가 있으면 추가
				}
			});
		});
		

		$(document).on("click",".btn_menu",function(){
			$(this).toggleClass('on');
			$('.mob_wrap').toggleClass('on');
			if($('.btn_menu').hasClass('on')) {
				$('html, body').css({'overflow': 'hidden', 'height': '100%'});
				$(this).attr('title','메뉴열림');
			} else {
				$('html, body').css({'overflow': 'auto', 'height': 'auto'});
				$(this).removeAttr('title');
			}
		});
		$(document).on("click",".gnb_mob > li > a",function(){
			$(this).closest('li').toggleClass('on');
			$(this).closest('li').find('.gnb_2dpt').slideToggle();
			if($('.gnb_mob > li').hasClass('on')) {
				$(this).removeAttr('title');
			} else {
				$(this).attr('title','메뉴열림');
			}	
		})
		// $(document).on("click", ".mob_2dpt > li > a", function () {
		// 	const $currentLi = $(this).closest('li');
		// 	const $currentSnb = $currentLi.find('.snb_depth3');
		
		// 	// 애니메이션 멈추고 토글
		// 	$currentSnb.stop(true, true).slideToggle();
		// 	$currentLi.toggleClass('on');
		
		// 	// 현재 상태에 따라 title 속성 관리
		// 	if ($currentLi.hasClass('on')) {
		// 		$(this).attr('title', '메뉴열림'); // 열렸을 때 title 제거
		// 	} else {
		// 		$(this).removeAttr('title'); // 닫혔을 때 title 추가
		// 	}
		
		// 	// 다른 메뉴 닫기
		// 	$('.mob_2dpt > li').not($currentLi).removeClass('on')
		// 		.find('.snb_depth3').stop(true, true).slideUp()
		// 		.end().find('a').attr('title', '메뉴열림'); // 다른 메뉴의 title 속성 추가
		// });
		$(document).on("click", ".mob_2dpt > li > a", function () {
			const $currentLi = $(this).closest('li');
			const $currentSnb = $currentLi.find('.snb_depth3');
		
			// 애니메이션 멈추고 토글
			$currentSnb.stop(true, true).slideToggle();
			$currentLi.toggleClass('on');
		
			// 현재 상태에 따라 title 속성 관리
			if ($currentLi.hasClass('on')) {
				$(this).attr('title', '메뉴열림');
			} else {
				$(this).removeAttr('title');
			}
		
			// 다른 메뉴 닫기
			$('.mob_2dpt > li').not($currentLi).removeClass('on')
				.find('.snb_depth3').stop(true, true).slideUp()
				.end().find('a').attr('title', '메뉴열림'); // 다른 메뉴의 title 속성 추가
		});
		
		// 🆕 snb_depth3 내부의 a 태그 클릭 시 snb_depth4 토글
		$(document).on("click", ".snb_depth3 > li > a", function (e) {
			/*e.preventDefault();*/ // 링크 기본 동작 방지
		
			const $currentLi = $(this).closest('li');
			const $currentSnb4 = $currentLi.find('.snb_depth4');
		
			// snb_depth4 토글
			$currentSnb4.stop(true, true).slideToggle();
			$currentLi.toggleClass('on');
		
			// 다른 snb_depth4 닫기
			$currentLi.siblings().removeClass('on')
				.find('.snb_depth4').stop(true, true).slideUp();
		});
		
		
	}
}


$(document).ready(function(){
	$('[role="tabpanel"]').attr('aria-hidden', 'true');
	$('[role="tabpanel"]').first().attr('aria-hidden', 'false');
	
	event.navOpen()
	event.popOpen()
	event.tabList()
	event.gnb();
	event.mobGnb();

	$(window).on("resize", function(){
		//react();
	}).resize();

});

// 버튼 클릭하면 하단섹션이 열림
$(document).ready(function(){		
	let isSectionVisible = false; // 하단 섹션이 열려 있는지 추적
	$('#toggleButton').on('click', function() {
		if (!isSectionVisible) {
			$('#bottomSection').slideDown(); // 하단 섹션을 펼침
			$('#toggleButton').attr('title','확대됨');
			isSectionVisible = true;
		} else {
			$('#bottomSection').slideUp(); // 하단 섹션을 닫음
			$('#toggleButton').attr('title','축소됨');
			isSectionVisible = false;
		}
	});
})

// 마우스 오버하면 슬라이드로 나타나는 콘텐츠
$(document).ready(function() {
    $('.hover_box').on('mouseenter focusin', function() {
        var $panel = $(this).find('.slide_panel');
        if (!$panel.is(':animated')) { // 애니메이션이 진행 중인지 확인
            $panel.stop(true, true).slideDown(300);	
			$(this).attr('title', '펼쳐짐')		
        }
    }).on('mouseleave blur', function() {
        var $panel = $(this).find('.slide_panel');
        if (!$panel.is(':animated')) { // 애니메이션이 진행 중인지 확인
            $panel.stop(true, true).slideUp(300);
			$(this).attr('title', '축소됨')
        }
    });
});



//레이어팝업
$(document).ready(function() {
    // 모든 solution 링크에 클릭 이벤트 리스너 추가
    $('.solution').on('click', function(e) {
        e.preventDefault();
        var popupId = $(this).data('popup');
        $('#' + popupId).fadeIn(); // 팝업을 나타내기 위해 fadeIn 사용
    });

    // 팝업 닫기 버튼
    $('.close_btn').on('click', function() {
        $(this).closest('.popup_layer').fadeOut(); // 팝업을 닫기 위해 fadeOut 사용
    });

    // 팝업 외부 클릭 시 닫기
    $(window).on('click', function(event) {
        $('.popup_layer').each(function() {
            if (event.target == this) {
                $(this).fadeOut(); // 외부 클릭 시 팝업 닫기
            }
        });
    });
});

//진단문항
$(document).ready(function() {
	let currentSlide = 0;
	const $slides = $('.surv_form > li');
	const totalSlides = $slides.length;
	const $progress = $('.surv_prog');

	// 초기 설정: 첫 번째 슬라이드를 제외한 모든 슬라이드 숨기기
	$slides.hide();
	$slides.eq(currentSlide).show();
	updateProgress();
	updateButtons();

	// 다음 단계 버튼 클릭 이벤트
	$('.surv_next').on('click', function() {
		if (currentSlide < totalSlides - 1) {
			$slides.eq(currentSlide).hide();
			currentSlide++;
			$slides.eq(currentSlide).show();
			updateProgress();
			updateButtons();
		}
	});

	// 이전 단계 버튼 클릭 이벤트
	$('.surv_prev').on('click', function() {
		if (currentSlide > 0) {
			$slides.eq(currentSlide).hide();
			currentSlide--;
			$slides.eq(currentSlide).show();
			updateProgress();
			updateButtons();
		}
	});

	// 진행 상황 업데이트 함수
	function updateProgress() {
		const progressValue = ((currentSlide + 1) / totalSlides) * 100;
		$progress.val(progressValue);
	}

	// 버튼 상태 업데이트 함수
	function updateButtons() {
		// 이전 단계 버튼 비활성화 처리
		$('.surv_prev').prop('disabled', currentSlide === 0);

		// 마지막 슬라이드에서는 '다음 단계' 버튼을 숨기고 '결과 조회' 버튼 표시
		if (currentSlide === totalSlides - 1) {
			$('.surv_next').prop('disabled', true);
			$('.surv_result').show();
		} else {
			$('.surv_next').prop('disabled', false);
			$('.surv_result').hide();
		}
	}

	// 페이지 로드 시 '결과 조회' 버튼 숨김
	$('.surv_result').hide();
});

// 검색바 del - 수정 2025
$(document).ready(function () {
	// 텍스트 입력 시 해당 영역의 search_del 버튼만 보이기
	$('.search_input').on('input', function () {
		const $wrap = $(this).closest('.search_bar');
		if ($(this).val().trim() !== '') {
			$wrap.find('.search_del').css('display', 'inline-block');
		} else {
			$wrap.find('.search_del').hide();
		}
	});

	// search_del 버튼 클릭 시 해당 입력만 초기화
	$('.search_del').on('click', function () {
		const $wrap = $(this).closest('.search_bar');
		$wrap.find('.search_input').val('').focus();
		$(this).hide();
	});
});


//목록형 테이블
$(window).on('load resize orientationchange', function () {
	$('.tb_base.tb_list tbody > tr > td').each(function () {
		var tableIndex = $(this).index();
		var tableT = $(this).parents('tbody').prev().children().children().eq(tableIndex).text();
		if ($(window).width() < 800) {
			$(this).attr('data-label', tableT);
		}
	});
});
//컨텐츠형 테이블
$(window).on('load resize orientationchange', function () {
	$('.tb_base.tb_view tbody > tr > td').each(function () {
		var tableT = $(this).prev().text();
		if ($(window).width() < 800) {
			$(this).attr('data-label', tableT);
		}
	});
});
$(window).on('load resize orientationchange', function () {
	$('.tb_base.tb_guide.tb_mobile tbody > tr > td').each(function () {
		var tableIndex = $(this).index();
		var tableT = $(this).parents('tbody').prev().children().children().eq(tableIndex).text();
		if ($(window).width() < 800) {
			$(this).attr('data-label', tableT);
		}
	});
});

$(document).ready(function() {
    // 버튼 추가
    $("body").append('<button type="button" id="scrollTopBtn" aria-label="페이지 상단으로 이동">Top</button>');

    

    // 스크롤 이벤트
    $(window).scroll(function() {
        if ($(this).scrollTop() > 200) { // 200px 이상 스크롤되면 버튼 보이기
            $("#scrollTopBtn").fadeIn();
        } else {
            $("#scrollTopBtn").fadeOut();
        }
    });

    // 버튼 클릭하면 상단으로 스크롤
    $("#scrollTopBtn").click(function() {
        $("html, body").animate({ scrollTop: 0 }, 500);
    });
});

/* 채용사례 탭 스크립트 */
$(document).ready(function(){		
		
	// 탭 이동 기능 유지
	$(".quick_list a").on("click", function (e) {
	e.preventDefault();

	// 클릭된 링크의 href 값을 가져와 대상 요소 선택
	var target = $($(this).attr("href"));

	// 애니메이션 중복 실행 방지
	$("html, body").stop().animate(
		{
		scrollTop: target.offset().top - $(".quick_list").outerHeight() - 240, // quick_list 높이 + 추가 여백
		},   
		500, // 스크롤 지속 시간 (밀리초)
	);

	// 활성화 상태 업데이트
	$(this).closest("li").addClass("active").siblings().removeClass("active");
	});
	
	// 상단 건너띄기 링크
	$('.contents').attr('id', 'lnb');
	
	// 사례 맞춤 검색 포커스
	$('.category_item li').attr('tabindex', '0');  
	
	
});

function fn_downFile(atchFileId, fileSn){
	window.open("/cmm/FileDown.do?atchFileGroupNo="+atchFileId+"&atchFileNo="+fileSn);
}


$(document).on('keydown','[role="link"], [role="button"]', function(e) {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			$(this).trigger('click');	
		}
	});

$(document).on('keydown', '.tab_wrap .tab_list > li > a', function (e) {
	const $tabs = $(this).closest('.tab_list').find('a');
	let index = $tabs.index(this);
	
	if (e.key === 'ArrowLeft' || e.key === 'Left') {
		e.preventDefault();
		index = (index === 0) ? $tabs.length - 1 : index - 1;
		$tabs.eq(index).focus().trigger('click');
	}
	
	if (e.key === 'ArrowRight' || e.key === 'Right') {
		e.preventDefault();
		index = (index === $tabs.length - 1) ? 0 : index + 1;
		$tabs.eq(index).focus().trigger('click');
	}
	});
