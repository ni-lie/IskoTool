<script>
    let date = new Date();
  
    setInterval(() => {
      date = new Date();
    }, 1000);
  
    $: dayFmt = new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(date);
    $: dateFmt = new Intl.DateTimeFormat('en-US', {month: 'long', day: '2-digit', year: 'numeric'}).format(date);
    $: timeFmt = new Intl.DateTimeFormat('en-US', {hour: 'numeric', minute: 'numeric'}).format(date);
  </script>
  
  <main>
    <h1 class="title">
      <p class="small-green-text"> Today is </p>
      {dayFmt} | {dateFmt}
      <p class="bold-green-text"> {timeFmt} </p>
    </h1>
    <!-- <PomodoroTimer /> -->
  </main>
  
  <style>
  p {
    margin: 0;
  }
  
  .small-green-text {
    color: var(--evergreen-dark);
    font-size: 1.5rem;
    font-weight: 300;
  }
  
  .bold-green-text {
    color: var(--evergreen-dark);
    font-size: 2rem;
  }
  
  </style>