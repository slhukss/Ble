window.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calSettings = {initialView: 'listMonth'};


    var calendar = new FullCalendar.Calendar(calendarEl, {
      height: 300,
      timeZone: 'JST',
      locale: 'ja',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,listYear'
      },
      initialView: calSettings.initialView,

      displayEventTime: true, 

      googleCalendarApiKey: 'AIzaSyCiR06L4G7JZqwb0PJ1hSfGMGYeA62M3ls',

      // My Calendar
      events: '1t940kcnhcqgus9bdc9gf4it2g@group.calendar.google.com',

    });

    calendar.render();
  });