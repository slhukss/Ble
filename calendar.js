document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
      height: 500,
      timeZone: 'JST',
      locale: 'ja',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,listYear'
      },

      displayEventTime: true, 

      googleCalendarApiKey: 'AIzaSyCiR06L4G7JZqwb0PJ1hSfGMGYeA62M3ls',

      // My Calendar
      events: '1t940kcnhcqgus9bdc9gf4it2g@group.calendar.google.com',

      loading: function(bool) {
        document.getElementById('loading').style.display =
          'none';
         // bool ? 'block' : 'none';/
      }

    });

    calendar.render();
  });