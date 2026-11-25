window.SITE = {
  url: "https://asahphys.github.io",
  photo: "assets/img/portrait.jpg",

  // Warm welcome (left side of page 1)
  welcome: "Welcome",
  intro: "Thank you for visiting. In the next few minutes you will find the key highlights: leadership programmes, selected projects, and the soundtrack behind them. I look forward to connecting.",

  // Leadership & experience: same names and order as LinkedIn (newest first).
  // One organisation with several "roles" is shown as a single card with its roles nested inside.
  // color / colorDark = colour of the timeline dot (the organisation's brand colour) in light / dark mode.
  leadership: [
    { org: "Amazon Web Services (AWS)", color: "#232F3E", colorDark: "#F2F4F7", span: "8 mos", roles: [
      { title: "AWS Agentic AI Business Scholar", type: "Apprenticeship", date: "Jul 2026 – Nov 2026", duration: "5 mos", location: "Seattle, Washington, United States" },
      { title: "AWS AI Academy", type: "Apprenticeship", date: "Apr 2026 – Sep 2026", duration: "6 mos", location: "Jakarta, Indonesia", note: "AWS x Dicoding" },
      { title: "AWS AI & ML Scholar", type: "Part-time", date: "Apr 2026 – Jun 2026", duration: "3 mos", location: "Seattle, Washington, United States" }
    ] },
    { org: "Hanyang University", color: "#0E4A84", colorDark: "#5B9FE0", roles: [
      { title: "Winter School (HIWS)", type: "Part-time", date: "Nov 2026 – Present", duration: "1 mo", location: "Seoul, South Korea", skill: "Korean and Entrepreneurship" }
    ] },
    { org: "Matsuo-Iwasawa Lab U-Tokyo", color: "#00A0E9", colorDark: "#4CC8FF", roles: [
      { title: "Data Science Summer Intern", type: "Part-time", date: "Apr 2026 – Aug 2026", duration: "5 mos", location: "Tokyo, Japan", skill: "Data Science" }
    ] },
    { org: "Hanyang University", color: "#0E4A84", colorDark: "#5B9FE0", roles: [
      { title: "Summer School (HISS)", type: "Part-time", date: "Jun 2026 – Jul 2026", duration: "2 mos", location: "Seoul, South Korea", skill: "Microeconomics" }
    ] },
    { org: "McKinsey & Company", color: "#2251FF", colorDark: "#7F9BFF", roles: [
      { title: "McKinsey Forward Program", type: "Part-time", date: "Mar 2026 – Jun 2026", duration: "4 mos", location: "Jakarta, Indonesia", skill: "Problem Solving" }
    ] },
    { org: "Ashoka", color: "#2F5FA7", colorDark: "#79A9F0", roles: [
      { title: "Ashoka x Boehringer Ingelheim - Social Intrapreneurship", type: "Seasonal", date: "Apr 2026 – May 2026", duration: "2 mos", location: "Arlington, Virginia, United States", skill: "Social Entrepreneurship" }
    ] }
  ],
  // Projects: "icon" picks the animated icon: heart, train, loan, care, mining or spark (a bar chart).
  projects: [
    { title: "Machine Learning Project: Heart Disease Risk Classification", icon: "heart", text: "", tech: [], link: "" },
    { title: "MTA New York: Post-COVID Strategic Transit Audit", icon: "train", text: "", tech: [], link: "" },
    { title: "Automated Loan Eligibility Evaluation", icon: "loan", text: "", tech: [], link: "" },
    { title: "Healthcare & Agriculture Shared Value Strategy", icon: "care", text: "", tech: [], link: "" },
    { title: "Data Mining Agricultural MidTerm Project", icon: "mining", text: "", tech: [], link: "" },
  ],

  // Music list (shown below Projects): add or remove lines freely
  musicSubtitle: "Some of the songs I listen to through the years",
  songs: [
    { title: "Queen Of Disaster", artist: "Lana Del Rey", date: "2013-05-16" },
    { title: "Birthday", artist: "Katy Perry", date: "2013-10-18" },
    { title: "I Will Never Let You Down", artist: "Rita Ora", date: "2014-03-31" },
    { title: "Shower", artist: "Becky G", date: "2014-04-23" },
    { title: "One Last Time", artist: "Ariana Grande", date: "2014-08-22" },
    { title: "Lush Life", artist: "Zara Larsson", date: "2015-06-05" },
    { title: "Love Myself", artist: "Hailee Steinfeld", date: "2015-08" },
    { title: "Rock Bottom", artist: "Hailee Steinfeld", date: "2015-11" },
    { title: "Starving", artist: "Hailee Steinfeld", date: "2016-07-22" },
    { title: "Most Girls", artist: "Hailee Steinfeld", date: "2017-04" },
    { title: "I'm the One", artist: "DJ Khaled ft. Justin Bieber, Chance the Rapper, Lil Wayne", date: "2017-04-28" },
    { title: "Let Me Go", artist: "Hailee Steinfeld", date: "2017-09" },
    { title: "Capital Letters", artist: "Hailee Steinfeld", date: "2018-01" },
    { title: "I'll Be There", artist: "Jess Glynne", date: "2018-05-04" },
    { title: "No Brainer", artist: "DJ Khaled ft. Justin Bieber, Chance the Rapper, Quavo", date: "2018-07-27" },
    { title: "Let You Love Me", artist: "Rita Ora", date: "2018-09-21" },
    { title: "Ruin My Life", artist: "Zara Larsson", date: "2018-10" },
    { title: "Back To Life", artist: "Hailee Steinfeld", date: "2018-12" },
    { title: "Bloodline", artist: "Ariana Grande", date: "2019-02-08" },
    { title: "All The Time", artist: "Zara Larsson", date: "2019-06-21" },
    { title: "10,000 Hours", artist: "Dan + Shay & Justin Bieber", date: "2019-10-04" },
    { title: "Wrong Direction", artist: "Hailee Steinfeld", date: "2020-01-01" },
    { title: "I Love You's", artist: "Hailee Steinfeld", date: "2020-03-26" },
    { title: "POPSTAR (Starring Justin Bieber)", artist: "DJ Khaled ft. Drake", date: "2020-07-17" },
    { title: "Coast", artist: "Hailee Steinfeld", date: "2022-07-29" },
    { title: "I'll Be There", artist: "Robin Schulz, Rita Ora & Tiago PZK", date: "2023-10-13" },
    { title: "Diet Pepsi", artist: "Addison Rae", date: "2024-08-09" },
    { title: "Bittersweet", artist: "Madison Beer", date: "2025-10-10" }
  ],

  // Movies list (shown below Music): the list sorts itself by "date" (oldest first), so order here does not matter
  movieSubtitle: "Some of the movies and dramas I have enjoyed",
  movies: [
    { title: "Me Before You", date: "2016-06-03", poster: "assets/img/movies/me-before-you.jpg" },
    { title: "La La Land", date: "2016-12-09", poster: "assets/img/movies/la-la-land.jpg" },
    { title: "The Bride of Habaek", date: "2017-07-03", poster: "assets/img/movies/the-bride-of-habaek.jpg" },
    { title: "My ID is Gangnam Beauty", date: "2018-07-18", poster: "assets/img/movies/my-id-is-gangnam-beauty.jpg" },
    { title: "Rookie Historian Goo Hae-ryung", date: "2019-05-06", poster: "assets/img/movies/rookie-historian-goo-hae-ryung.jpg" },
    { title: "Angel's Last Mission: Love", date: "2019-07-22", poster: "assets/img/movies/angels-last-mission-love.jpg" },
    { title: "Vagabond", date: "2019-09-20", poster: "assets/img/movies/vagabond.jpg" },
    { title: "Crash Landing on You", date: "2019-12-14", poster: "assets/img/movies/crash-landing-on-you.jpg" },
    { title: "Itaewon Class", date: "2020-01-31", poster: "assets/img/movies/itaewon-class.jpg" },
    { title: "Memorist", date: "2020-04-01", poster: "assets/img/movies/memorist.jpg" },
    { title: "Start-Up", date: "2020-10-17", poster: "assets/img/movies/start-up.jpg" },
    { title: "True Beauty", date: "2020-12-09", poster: "assets/img/movies/true-beauty.jpg" },
    { title: "Mr. Queen", date: "2020-12-12", poster: "assets/img/movies/mr-queen.jpg" },
    { title: "Vincenzo", date: "2021-02-20", poster: "assets/img/movies/vincenzo.jpg" },
    { title: "Moonshine", date: "2021-12-20", poster: "assets/img/movies/moonshine.jpg" },
    { title: "Business Proposal", date: "2022-02-28", poster: "assets/img/movies/business-proposal.jpg" },
    { title: "Runner", date: "2026-09-11", poster: "assets/img/movies/runner.jpg" }
  ],

  // Instagram-style photos: put files in assets/img/gallery/ and list them here.
  gallery: [
    { src: "assets/img/gallery/02.jpg" },
    { src: "assets/img/gallery/05.jpg" }
  ]
};
