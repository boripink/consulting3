// 2025 JKA

//토글버튼
$(function () {
	const $btn = $('.btn_toggle');
	const $list = $('#' + $btn.attr('aria-controls'));

	function updatePopularListByViewport() {
		const isMobile = window.innerWidth <= 768;
		if (isMobile) {
			$btn.attr('aria-expanded', 'false').attr('aria-label', '인기 검색어 펼치기');
			$list.attr('hidden', true);
		} else {
			$btn.attr('aria-expanded', 'true').attr('aria-label', '인기 검색어 접기');
			$list.removeAttr('hidden');
		}
	}

	// 초기 실행 + resize 반응
	updatePopularListByViewport();
	$(window).on('resize', updatePopularListByViewport);

	// 클릭 시 토글
	$btn.on('click', function () {
		const isExpanded = $(this).attr('aria-expanded') === 'true';
		$(this).attr('aria-expanded', !isExpanded);
		$(this).attr('aria-label', isExpanded ? '인기 검색어 펼치기' : '인기 검색어 접기');
		$list.attr('hidden', isExpanded);
	});
});




//통합검색 


$(function () {
  // 연관검색어 
	$('.search_input').on('input', function () {
	const $form = $(this).closest('.autocomplete_form');
	const $list = $form.find('.autocomplete_list');
	const keyword = $(this).val().trim().toLowerCase();

	const sampleKeywords = ["고용 컨설팅", "고용 역량 진단", "장애인 고용", "고용 사례", "채용 공고"];

	if (keyword.length === 0) {
		$list.hide();
		return;
	}

	const matches = sampleKeywords.filter(word => word.toLowerCase().includes(keyword));
	if (matches.length > 0) {
		$list.empty();
		matches.forEach(function (match) {
			$list.append(`<li tabindex="0" role="option">${match}</li>`);
		});
		$list.show();
	} else {
		$list.hide();
	}
});

	// 클릭 시 입력창에 삽입
	$(document).on('click', '.autocomplete_list li', function () {
	const $form = $(this).closest('.autocomplete_form');
	$form.find('.search_input').val($(this).text()).focus();
	$form.find('.autocomplete_list').hide();
});


	// 검색어 삭제 버튼 처리
	$('.search_del').on('click', function () {
		$('.search_input').val('').focus();
		$('.autocomplete_list').hide();
	});

	// 포커스 아웃 시 자동 숨김
	$('.search_input').on('blur', function () {
		setTimeout(() => {
			$('.autocomplete_list').hide();
		}, 200); // 클릭 선택까지 대기
	});

  
  //검색필터 결과 컬러변경 스크립트
  function updateCountStyle() {
    $('.total_filter .count').each(function () {
    const $count = $(this);
    const match = $count.text().match(/\((\d+)/);
    const num = match ? parseInt(match[1], 10) : 0;

    if (num > 0) {
      $count.css({
      'color': '#236cdb',
      'font-weight': 500
      });
    } else {
      $count.css({
      'color': '#666',
      'font-weight': 'normal'
      });
    }
    });
  }

  updateCountStyle();

});




// datepicker
$(function () {
  // 한국어 설정
  $.datepicker.regional["ko"] = {
    closeText: "닫기",
    prevText: "이전달",
    nextText: "다음달",
    currentText: "오늘",
    monthNames: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    monthNamesShort: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    dayNames: ["일", "월", "화", "수", "목", "금", "토"],
    dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
    dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
    weekHeader: "주",
    dateFormat: "yy-mm-dd",
    firstDay: 0,
    isRTL: false,
    showMonthAfterYear: true,
    yearSuffix: "년",
  };
  $.datepicker.setDefaults($.datepicker.regional["ko"]);

  const options = {
    dateFormat: "yy-mm-dd",
    changeMonth: true,
    changeYear: true,
  };

  // 한달전 ~ 오늘 날짜
  var today = new Date();
  var lastMonth = new Date();
  lastMonth.setMonth(today.getMonth() - 1);

  function formatDate(date) {
    var yyyy = date.getFullYear();
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var dd = String(date.getDate()).padStart(2, '0');
    return yyyy + '-' + mm + '-' + dd;
  }

  $('#startInput').val(formatDate(lastMonth));
  $('.todayInput').val(formatDate(today));

  // 시작일 달력 버튼
  $("#startBtn").on("click", function () {
    $("#startInput")
      .datepicker("destroy")
      .datepicker(
        $.extend({}, options, {
          onClose: function (selectedDate) {
            $(".todayInput").datepicker("option", "minDate", selectedDate);
          },
        })
      )
      .datepicker("show");
  });

  // 종료일 달력 버튼
  $(".todayBtn").on("click", function () {
    $(".todayInput")
      .datepicker("destroy")
      .datepicker(
        $.extend({}, options, {
          onClose: function (selectedDate) {
            $(".todayInput").datepicker("option", "maxDate", selectedDate);
          },
        })
      )
      .datepicker("show");
  });

  // 요일
  
  function getDayOfWeekText(dateStr) {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const date = new Date(dateStr);
    if (isNaN(date)) return '';
    return days[date.getDay()];
  }
   
  const initialDate = $('.todayInput').val();
  const initialDayText = getDayOfWeekText(initialDate);
  $('.day_of_week').text(initialDayText);

  $('.todayInput').on('change', function () {
    const dayText = getDayOfWeekText($(this).val());
    $('.day_of_week').text(dayText);
  });
  

  
});

// 회의록 윈도우창

// 회의록 생성 추가버튼
// 참석자 추가
$(document).on('click', '#btn_add_attendee', function() {
  const newRow = `
    <li class="attendee_item">
												<div class="form_unit">
													<label for="org1" class="sr-only">소속</label>
													<input type="text" id="org1" name="org[]" placeholder="소속"
														aria-label="소속">
												</div>
												<div class="form_unit">
													<label for="dept1" class="sr-only">부서</label>
													<input type="text" id="dept1" name="dept[]" placeholder="부서"
														aria-label="부서">
												</div>
												<div class="form_unit">
													<label for="rank1" class="sr-only">직급</label>
													<input type="text" id="rank1" name="rank[]" placeholder="직급"
														aria-label="직급">
												</div>
												<div class="form_unit">
													<label for="name1" class="sr-only">성명</label>
													<input type="text" id="name1" name="name[]" placeholder="성명"
														aria-label="성명">
												</div>
												<div class="form_btn">
													<button type="button" class="td_btn del"
														aria-label="입력된성명 삭제">삭제</button>
												</div>
											</li>
  `;
  $('.attendee_list').append(newRow);
});

// 삭제
$(document).on('click', '.td_btn.del', function() {
  $(this).closest('li').remove();
});

// 행정사항 추가
$(document).on('click', '#btn_add_action', function() {
  const newRow = `
    <li class="action_item">
      <div class="form_unit w180">
        <label for="actionType1" class="sr-only">유형</label>
        <select id="actionType1" name="actionType[]">
          <option value="">-- 선택 --</option>
          <option value="">외부 미팅</option>
          <option value="">내부 회의</option>
          <option value="">채용 면접</option>
          <option value="">근로자 상담</option>
        </select>
      </div>
      <div class="form_unit wide">
        <label for="actionText1" class="sr-only">내용</label>
        <input type="text" id="actionText1" name="actionText[]"
          placeholder="내용 입력" aria-label="내용">
      </div>
      <div class="form_date">
        <label for="startInput1" class="sr-only">기한</label>
        <div class="datepicker_inp">
          <input type="text" id="startInput1" name="startDt"
            placeholder="2025-01-01" class="wd100" aria-label="기한">
          <button type="button" id="startBtn1" class="btn_calendar"
            aria-label="달력 열기">달력</button>
        </div>
      </div>
      <div class="form_btn">
        <button type="button" class="btn_del_action td_btn del"
          aria-label="행정사항 삭제">삭제</button>
      </div>
    </li>
  `;
  $('.action_list').append(newRow);
});

