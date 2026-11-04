import type { WritingTask } from '../types';

const ACADEMIC_INSTRUCTION =
  'Summarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.';

export const writingTask1: WritingTask[] = [
  /* ------------------------------------------------------------------ */
  /* w1-01 LINE — museum visits                                          */
  /* ------------------------------------------------------------------ */
  {
    id: 'w1-01',
    task: 1,
    module: 'academic',
    type: 'line',
    topic: 'Culture and leisure',
    prompt:
      'You should spend about 20 minutes on this task.\n\nThe graph below shows the number of visits to three types of museum in one country between 2000 and 2020.\n\n' +
      ACADEMIC_INSTRUCTION,
    visual: {
      kind: 'line',
      title: 'Annual visits to museums by type, 2000–2020',
      xLabel: 'Year',
      yLabel: 'Visits (millions)',
      categories: ['2000', '2004', '2008', '2012', '2016', '2020'],
      series: [
        { name: 'Science museums', values: [4.2, 4.8, 5.6, 6.5, 7.3, 8.0] },
        { name: 'Art galleries', values: [6.0, 5.9, 6.2, 6.1, 6.4, 6.3] },
        { name: 'History museums', values: [7.5, 6.8, 6.0, 5.1, 4.6, 4.0] },
      ],
    },
    plan: [
      'Paraphrase the prompt in one sentence: line graph, visits to science museums, art galleries and history museums, one country, 2000–2020 (do not copy "the number of visits to three types of museum").',
      'Overview (2 sentences): science museums rose from least to most visited, history museums did the reverse, and art galleries stayed almost flat at around 6 million. No numbers needed here.',
      'Body 1 — the falling line: start with the 2000 ranking (history 7.5m, art 6m, science 4.2m), then trace history museums dropping below art galleries by 2008 (6.0m vs 6.2m) and ending at 4m.',
      'Body 2 — the rising line and the flat line: science climbs to 5.6m (2008), overtakes both others by 2012 (6.5m) and nearly doubles to 8m; art galleries fluctuate narrowly between 5.9m and 6.4m and finish at 6.3m.',
      'Group the data by trend, not by year — do not list all 18 values; select the start, the crossing points and the end.',
      'Use past tenses throughout (the period is finished) and vary the language for change: climbed, fell steadily, fluctuated, overtook.',
      'Check the word count (aim for 170–190) and that every figure matches the graph.',
    ],
    usefulLanguage: [
      'went from being the least visited to the most popular',
      'experienced the reverse trend',
      'remained remarkably stable throughout',
      'well ahead of',
      'dropped below the figure for',
      'followed the opposite pattern',
      'overtook both other types',
      'almost doubled to',
      'fluctuated only slightly, between … and …',
      'ending the period at just …',
      'little more than half the original level',
    ],
    models: [
      {
        band: 8.5,
        text:
          'The line graph compares the number of visits made to science museums, art galleries and history museums in one country over a twenty-year period starting in 2000.\n\n' +
          'Overall, science museums went from being the least visited of the three to the most popular, while history museums experienced the reverse trend. Attendance at art galleries, by contrast, remained remarkably stable throughout.\n\n' +
          'In 2000, history museums attracted 7.5 million visits, well ahead of art galleries (6 million) and science museums (4.2 million). Over the following two decades, however, visits to history museums fell steadily, dropping below the figure for art galleries by 2008 and ending the period at just 4 million, little more than half the original level.\n\n' +
          'Science museums followed the opposite pattern. Their visitor numbers climbed consistently, reaching 5.6 million in 2008 before overtaking both other types to hit 6.5 million in 2012. By 2020, they had almost doubled to 8 million. Art galleries, meanwhile, fluctuated only slightly, between 5.9 and 6.4 million, and finished at 6.3 million, which left them in second place.',
        commentary: {
          tr: 'All key features are covered: the reversal in ranking between science and history museums, the crossing points and the stability of art galleries. The overview is clear and placed early, and figures are selected rather than listed, with every number matching the graph.',
          cc: 'Information is grouped logically by trend — the declining line in one paragraph, the rising and stable lines in the other. Cohesion is achieved naturally through referencing ("Their visitor numbers", "the figure for art galleries") and linkers such as "by contrast" and "meanwhile" rather than mechanical sequencing.',
          lr: 'A wide range of precise vocabulary is used for trends ("fluctuated only slightly", "overtaking", "experienced the reverse trend") with natural collocations such as "well ahead of". Approximation ("little more than half", "almost doubled") is used accurately.',
          gra: 'A good mix of complex structures appears, including participle clauses ("dropping below the figure…") and past perfect ("had almost doubled"). Errors are absent and punctuation is controlled.',
        },
      },
      {
        band: 6,
        text:
          'The graph shows how many people visited three kind of museums in one country from 2000 to 2020.\n\n' +
          'Firstly, science museums had 4.2 million visits in 2000. Then it increased to 4.8 million in 2004 and 5.6 million in 2008. After that it continued to increase to 6.5 million in 2012 and 7.3 million in 2016. Finally it reached 8 million in 2020.\n\n' +
          'Secondly, art galleries started at 6 million visits. It went down a little to 5.9 million in 2004 and then it go up to 6.2 million in 2008. In 2020 it was 6.3 million, so it was almost same during the period.\n\n' +
          'Thirdly, history museums were the most popular in 2000 with 7.5 million. However, the number kept decreasing and in 2020 it was only 4 million. Moreover, it was lower than art galleries in 2008.\n\n' +
          'In conclusion, science museums increased, history museums decreased and art galleries were stable. Science museums was the most popular in the end.',
        commentary: {
          tr: 'The main trends are identified and the figures quoted are accurate, but the science museum paragraph lists almost every data point instead of selecting key ones. The overview only appears in the conclusion and is rather basic; the important point that science museums overtook both other types is not clearly highlighted.',
          cc: 'The organisation is clear (one paragraph per museum type), but linking is mechanical — "Firstly / Secondly / Thirdly" and "Then… After that… Finally" — and there is little comparison across paragraphs. Reference with "it" for plural nouns ("science museums… it increased") is sometimes unclear.',
          lr: 'Vocabulary is adequate but repetitive: "increase" appears three times in two sentences and the range of trend language is limited. There are minor slips such as "three kind of museums" and "almost same".',
          gra: 'Simple sentences dominate and there are noticeable agreement and tense errors ("then it go up", "Science museums was"). These errors do not impede communication, which is typical of band 6.',
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* w1-02 LINE — electricity generation                                 */
  /* ------------------------------------------------------------------ */
  {
    id: 'w1-02',
    task: 1,
    module: 'academic',
    type: 'line',
    topic: 'Energy',
    prompt:
      'You should spend about 20 minutes on this task.\n\nThe graph below shows the percentage of electricity generated from four different sources in one country between 2000 and 2025.\n\n' +
      ACADEMIC_INSTRUCTION,
    visual: {
      kind: 'line',
      title: 'Share of electricity generation by source, 2000–2025',
      xLabel: 'Year',
      yLabel: 'Percentage of total electricity (%)',
      categories: ['2000', '2005', '2010', '2015', '2020', '2025'],
      series: [
        { name: 'Coal', values: [52, 48, 41, 30, 19, 11] },
        { name: 'Natural gas', values: [25, 28, 32, 34, 31, 27] },
        { name: 'Nuclear', values: [18, 18, 17, 16, 15, 14] },
        { name: 'Renewables', values: [5, 6, 10, 20, 35, 48] },
      ],
    },
    plan: [
      'Introduction: paraphrase as "the share of electricity produced from coal, natural gas, nuclear power and renewable sources" and keep the time frame 2000–2025.',
      'Overview: the big story is the swap between coal (dominant at first, smallest by 2025) and renewables (tiny at first, almost half by 2025); gas and nuclear changed only modestly.',
      'Body 1 — coal and renewables together, because they mirror each other: coal 52% → 41% (2010) → 11%; renewables 5% → 10% (2010) → 48%, overtaking coal and gas between 2015 and 2020.',
      'Body 2 — the two "minor movers": gas rises from 25% to a peak of 34% in 2015 then falls back to 27%; nuclear edges down from 18% to 14%.',
      'Use proportion language correctly ("accounted for", "share", "a quarter") and avoid saying coal "produced less electricity" — the graph shows percentages, not amounts.',
      'Do not explain causes (e.g. government policy): Task 1 reports data only.',
      'Proofread numbers and keep to about 180 words.',
    ],
    usefulLanguage: [
      'the share of electricity produced from',
      'accounted for just over half',
      'the dominant source',
      'the least significant source',
      'declined steadily at first before plummeting',
      'mirrored this pattern in reverse',
      'a mere 5%',
      'surged, overtaking both coal and gas',
      'rose gradually to a peak of',
      'fell back to',
      'edged down from … to …',
      'the most stable source',
    ],
    models: [
      {
        band: 9,
        text:
          'The line graph illustrates how the share of electricity produced from coal, natural gas, nuclear power and renewable sources changed in one country between 2000 and 2025.\n\n' +
          'The most striking feature is the dramatic shift from coal to renewables: coal began as the dominant source but had become the least significant by 2025, when renewables generated almost half of the nation\'s electricity. Gas and nuclear power showed far more modest changes.\n\n' +
          'In 2000, coal accounted for just over half (52%) of all electricity, and its share declined steadily at first before plummeting from 41% in 2010 to only 11% in 2025. Renewables mirrored this pattern in reverse. Having contributed a mere 5% at the start of the period, they doubled to 10% by 2010 and then surged, overtaking both coal and gas between 2015 and 2020 to reach 48% by the end.\n\n' +
          'Natural gas rose gradually from a quarter of the total to a peak of 34% in 2015, before falling back to 27%. Nuclear power, meanwhile, was the most stable source, edging down from 18% to 14% over the 25 years.',
        commentary: {
          tr: 'The response fully satisfies the task: the overview pinpoints the coal–renewables reversal and contrasts it with the minor changes in gas and nuclear. Key figures, the 2015–2020 crossing point and the gas peak are all accurately reported.',
          cc: 'Grouping coal and renewables together because they mirror each other is a sophisticated organisational choice. Cohesive devices are used skilfully and unobtrusively ("Renewables mirrored this pattern in reverse", "meanwhile").',
          lr: 'Vocabulary is precise and natural, with well-chosen verbs for different speeds of change ("edging down", "plummeting", "surged"). Proportion language ("accounted for just over half", "a quarter of the total") is used flawlessly.',
          gra: 'The writer uses a wide range of structures, including a perfect participle clause ("Having contributed a mere 5%…"), past perfect and a non-defining relative clause, all error-free.',
        },
      },
      {
        band: 6,
        text:
          'The graph shows the percentage of electricity which was made from four sources in a country from 2000 to 2025.\n\n' +
          'In 2000, coal was the biggest source with 52%. After that, it decreased to 41% in 2010 and 30% in 2015. Then it fell sharply to 11% in 2025. On the other hand, renewable energy was only 5% in 2000 but it increased a lot. In 2015 it was 20% and in 2025 it reached to 48%, so it became the biggest source.\n\n' +
          'Natural gas was 25% in 2000. It rised slowly to 34% in 2015 and after that it dropped to 27% in 2025. Nuclear was 18% in 2000 and 2005 and then it decrease a little every five years and it was 14% in 2025.\n\n' +
          'To sum up, coal and nuclear went down and renewable and natural gas went up. Renewable energy had the most big change in this period. It is a very big change for this country.',
        commentary: {
          tr: 'The main trends are reported with accurate figures, and the fact that renewables became the largest source is mentioned. However, the overview comes only at the end and is partly misleading — saying natural gas "went up" ignores its fall after 2015 — and the final sentence adds no information.',
          cc: 'Paragraphing is logical and coal and renewables are usefully contrasted with "On the other hand". Elsewhere, linking relies on a narrow set of sequencers ("After that", "Then") and long chains joined by "and".',
          lr: 'The vocabulary is sufficient for the task, with some variety ("fell sharply", "dropped"). There are errors in word form and collocation, such as "rised", "reached to 48%" and "the most big change".',
          gra: 'A mix of simple and compound sentences is attempted, but complex structures are rare. Errors such as "it decrease a little" and the incorrect comparative are frequent but do not cause confusion.',
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* w1-03 BAR — leisure time by age                                     */
  /* ------------------------------------------------------------------ */
  {
    id: 'w1-03',
    task: 1,
    module: 'academic',
    type: 'bar',
    topic: 'Lifestyle and leisure',
    prompt:
      'You should spend about 20 minutes on this task.\n\nThe bar chart below shows the average number of hours per week that people in four age groups in one country spent on four leisure activities in 2024.\n\n' +
      ACADEMIC_INSTRUCTION,
    visual: {
      kind: 'bar',
      title: 'Average weekly hours spent on leisure activities by age group, 2024',
      xLabel: 'Age group',
      yLabel: 'Hours per week',
      categories: ['16–24', '25–44', '45–64', '65+'],
      series: [
        { name: 'Watching TV', values: [8, 11, 15, 22] },
        { name: 'Using social media', values: [18, 12, 7, 3] },
        { name: 'Sport and exercise', values: [6, 4, 3, 2] },
        { name: 'Reading', values: [2, 3, 5, 8] },
      ],
    },
    plan: [
      'Introduction: paraphrase "average number of hours per week" as "average amount of time … each week" and name the four activities.',
      'Overview: a generational divide — social media dominates for the young, TV for the old; sport falls with age while reading rises with age.',
      'Body 1 — the two big activities (TV vs social media): 16–24 group 18h social media vs 8h TV; the gap narrows at 25–44 (12 vs 11); positions reverse from 45; over-65s 22h TV vs 3h social media.',
      'Body 2 — the two small activities: sport 6h → 2h; reading 2h → 8h, so the oldest read four times as much as the youngest.',
      'Compare across age groups rather than describing each age group separately — this is how you show the trends.',
      'Use past tense (the data is from 2024) and phrases such as "respectively" to report two figures efficiently.',
      'Check every number against the bars before finishing (16 values in total — select about 10).',
    ],
    usefulLanguage: [
      'a clear generational divide',
      'devoted most of their free time to',
      'dominated the leisure hours of',
      'decreased with age',
      'followed the opposite trend',
      'more than double the',
      'this gap narrowed among',
      'the positions were reversed',
      '… and … hours respectively',
      'four times as much as',
      'the two less time-consuming activities',
    ],
    models: [
      {
        band: 8.5,
        text:
          'The bar chart compares the average amount of time people in four age groups spent each week watching television, using social media, doing sport and reading in 2024.\n\n' +
          'Overall, there was a clear generational divide: younger people devoted most of their free time to social media, whereas television dominated the leisure hours of older age groups. Time spent on sport decreased with age, while reading followed the opposite trend.\n\n' +
          'The youngest group, aged 16 to 24, spent 18 hours a week on social media, more than double the 8 hours they spent watching TV. This gap narrowed among 25- to 44-year-olds (12 and 11 hours respectively), and from the age of 45 the positions were reversed. People aged 65 and over watched television for 22 hours weekly but used social media for only 3.\n\n' +
          'The two less time-consuming activities showed contrasting patterns. Sport and exercise accounted for 6 hours a week among the youngest respondents but just 2 hours among the over-65s. Reading, on the other hand, rose steadily from 2 hours to 8 hours across the age groups, so the oldest group read four times as much as the youngest.',
        commentary: {
          tr: 'The overview captures both the main contrast (social media vs TV) and the secondary patterns (sport vs reading). Data is selected intelligently — the end points and the crossover between 25–44 and 45–64 — and all figures are accurate.',
          cc: 'Paragraphs are organised around pairs of contrasting activities rather than age groups, which allows comparisons to emerge naturally. Referencing ("This gap", "the positions") links ideas smoothly across sentences.',
          lr: 'There is a sophisticated range of expression ("a clear generational divide", "devoted most of their free time to", "the two less time-consuming activities"). Comparative language such as "four times as much as" and "respectively" is used precisely.',
          gra: 'Complex sentences with appositive phrases ("The youngest group, aged 16 to 24,…") and contrastive clauses are handled with full control. The response is error-free.',
        },
      },
      {
        band: 6,
        text:
          'The bar chart shows how many hours people spend on four activities in a week in different ages in 2024.\n\n' +
          'According to the chart, people who are 16-24 spend 18 hours on social media and this is the highest for this group. They also watch TV for 8 hours, do sport 6 hours and read 2 hours. People between 25-44 spend 12 hours on social media and 11 hours for watching TV.\n\n' +
          'For the 45-64 group, watching TV is 15 hours which is more than social media (7 hours). Also, the 65+ group watch TV the most with 22 hours, it is the highest number in the chart. They only use social media 3 hours.\n\n' +
          'In addition, sport is decreasing when people get older, from 6 hours to 2 hours. But reading is increasing from 2 hours to 8 hours, so old people read more than young people.\n\n' +
          'Overall, young people like social media and old people like watching TV more than other activities.',
        commentary: {
          tr: 'Key features are presented and the numbers are accurate, but the first two body paragraphs move age group by age group, so the reversal between TV and social media is implied rather than stated. The overview at the end is simplistic and omits the sport and reading trends; the use of present tense for 2024 data is also inappropriate.',
          cc: 'There is a clear overall progression, but linking is limited to basic devices ("Also", "In addition", "But"). The comma splice in "22 hours, it is the highest number" shows some faulty sentence linking.',
          lr: 'Vocabulary is adequate but basic and repetitive ("spend… hours" is repeated), and there are collocation problems such as "in different ages" and "11 hours for watching TV". Words like "like" in the overview interpret the data as preference, which is imprecise.',
          gra: 'Mostly simple and compound sentences with a few relative clauses. Errors such as "the 65+ group watch" and the missing preposition in "do sport 6 hours" are noticeable but do not obscure meaning.',
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* w1-04 BAR — international students                                   */
  /* ------------------------------------------------------------------ */
  {
    id: 'w1-04',
    task: 1,
    module: 'academic',
    type: 'bar',
    topic: 'Education',
    prompt:
      'You should spend about 20 minutes on this task.\n\nThe chart below shows the number of international students from five regions who were enrolled at universities in one English-speaking country in 2010 and 2023.\n\n' +
      ACADEMIC_INSTRUCTION,
    visual: {
      kind: 'bar',
      title: 'International university students by region of origin, 2010 and 2023',
      xLabel: 'Region of origin',
      yLabel: 'Students (thousands)',
      categories: ['East Asia', 'South Asia', 'Europe', 'Africa', 'Latin America'],
      series: [
        { name: '2010', values: [85, 40, 55, 15, 10] },
        { name: '2023', values: [120, 110, 48, 35, 22] },
      ],
    },
    plan: [
      'Introduction: paraphrase "enrolled at universities" as "studying at universities" and mention five world regions and the two years.',
      'Overview: total rose from 205,000 to 335,000 (add up the bars — this is a strong overview figure); all regions grew except Europe; East Asia stayed largest; South Asia showed the most dramatic growth.',
      'Body 1 — the big three: 2010 ranking (East Asia 85k, Europe 55k, South Asia 40k); by 2023 East Asia 120k, South Asia nearly tripled to 110k and moved into second place.',
      'Body 2 — Europe (only decline, 55k → 48k, from second to third) and the two smallest groups (Africa 15k → 35k, Latin America 10k → 22k — both more than doubled).',
      'Remember the y-axis is in thousands: write "85,000" or "85 thousand", never "85 students".',
      'Use ranking language (largest source, second place, fell to third) to make comparisons.',
      'Final check: rankings and multiples (nearly tripled = 40 → 110; more than doubled = 15 → 35 and 10 → 22).',
    ],
    usefulLanguage: [
      'rose considerably, from … to …',
      'with every region except Europe recording growth',
      'remained the largest source',
      'the most remarkable change was',
      'had almost caught up',
      'nearly tripled to',
      'pushing it into second place',
      'was the only region to see a decline',
      'slipping from … to …',
      'more than doubled',
      'in relative terms',
      'made up only around …% of the total',
    ],
    models: [
      {
        band: 8.5,
        text:
          'The bar chart shows how many international students from five world regions were studying at universities in one English-speaking country in 2010 and 2023.\n\n' +
          'Overall, the total number of overseas students rose considerably, from 205,000 to 335,000, with every region except Europe recording growth. East Asia remained the largest source in both years, but the most remarkable change was the rapid expansion in students from South Asia.\n\n' +
          'In 2010, East Asia supplied 85,000 students, followed by Europe with 55,000 and South Asia with 40,000. By 2023, the East Asian figure had grown to 120,000, yet South Asia had almost caught up: its enrolments nearly tripled to 110,000, pushing it into second place.\n\n' +
          'Europe was the only region to see a decline, with numbers slipping from 55,000 to 48,000, which meant it fell from second to third position. The two smallest groups expanded significantly in relative terms. Students from Africa rose from 15,000 to 35,000, and those from Latin America from 10,000 to 22,000, so both groups more than doubled, although together they still made up only around 17% of the total in 2023.',
        commentary: {
          tr: 'The overview is excellent: it calculates the overall total (205,000 to 335,000), notes the single exception (Europe) and identifies both the largest group and the most significant change. All figures, rankings and multiples are accurate, and the derived 17% share is correctly calculated (57,000 of 335,000).',
          cc: 'The response progresses from the largest regions to the smallest, and each paragraph has a clear focus. Cohesion is achieved through varied referencing ("the East Asian figure", "those from Latin America") and a well-placed colon that introduces explanation.',
          lr: 'Lexis is wide and precise: "had almost caught up", "slipping", "in relative terms", "recording growth". Synonyms for the topic ("overseas students", "enrolments", "source") avoid repetition.',
          gra: 'A wide range of structures is used accurately, including "with + noun + -ing" clauses, past perfect and ellipsis ("and those from Latin America from 10,000 to 22,000"). There are no errors.',
        },
      },
      {
        band: 6,
        text:
          'The bar chart gives information about international students from five regions in a country in 2010 and 2023.\n\n' +
          'In 2010, the most students came from East Asia, it was 85,000 students. Europe was second with 55,000 and South Asia had 40,000. Africa and Latin America were very low, only 15,000 and 10,000.\n\n' +
          'In 2023, East Asia was still the highest with 120,000 students. South Asia increased very much to 110,000 students. Europe was decreased to 48,000 students. Africa went up to 35,000 and Latin America went up to 22,000. This means South Asia was nearly as big as East Asia.\n\n' +
          'So, most regions had more students in 2023 than 2010, except Europe. The biggest increase was South Asia, it increased 70,000 students. On the other hand, Europe decreased 7,000 students.\n\n' +
          'In conclusion, the number of international students increased in this country and East Asia was the biggest region in both years, but South Asia was very close in 2023.',
        commentary: {
          tr: 'All the figures are accurate and the key changes (South Asia +70,000, Europe −7,000) are identified. However, the year-by-year organisation means comparisons are delayed until the fourth paragraph, and the overview in the conclusion is general and gives no total.',
          cc: 'Organising by year rather than by region forces the reader to compare paragraphs to see changes, and the third paragraph is essentially a list. Linkers are limited ("So", "On the other hand") and comma splices ("East Asia, it was 85,000 students") weaken cohesion.',
          lr: 'Vocabulary is adequate but repetitive ("went up… went up", "increased… increased"), with a limited range for describing change. Expressions such as "increased very much" and "were very low" are imprecise for academic data description.',
          gra: 'Sentence forms are mostly simple. There are errors in passive use ("Europe was decreased") and in verb patterns ("it increased 70,000 students" instead of "increased by"), though meaning remains clear.',
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* w1-05 PIE — household spending 1990 vs 2020                         */
  /* ------------------------------------------------------------------ */
  {
    id: 'w1-05',
    task: 1,
    module: 'academic',
    type: 'pie',
    topic: 'Economics and consumer spending',
    prompt:
      'You should spend about 20 minutes on this task.\n\nThe pie charts below show how the average household budget in one country was divided between six categories of spending in 1990 and 2020.\n\n' +
      ACADEMIC_INSTRUCTION,
    visual: {
      kind: 'pie',
      title: 'Average household spending by category (%)',
      charts: [
        {
          label: '1990',
          slices: [
            { name: 'Food', value: 30 },
            { name: 'Housing', value: 22 },
            { name: 'Transport', value: 14 },
            { name: 'Other', value: 13 },
            { name: 'Clothing', value: 12 },
            { name: 'Leisure', value: 9 },
          ],
        },
        {
          label: '2020',
          slices: [
            { name: 'Housing', value: 34 },
            { name: 'Food', value: 16 },
            { name: 'Other', value: 16 },
            { name: 'Transport', value: 15 },
            { name: 'Leisure', value: 14 },
            { name: 'Clothing', value: 5 },
          ],
        },
      ],
    },
    plan: [
      'Introduction: paraphrase as "the proportion of household expenditure devoted to six categories" in 1990 and 2020.',
      'Overview: housing replaced food as the largest expense; leisure grew and clothing shrank; transport hardly changed.',
      'Body 1 — the two biggest categories, which swapped places: food 30% → 16% (almost halved), housing 22% → 34% (over a third).',
      'Body 2 — the smaller categories: leisure 9% → 14% (main gainer), clothing 12% → 5% (now smallest), transport 14% → 15% (stable), other 13% → 16%.',
      'Compare the two years within each sentence rather than describing each pie separately.',
      'Use fraction language (almost a third, more than a third) and remember that changes in percentages are "percentage points".',
      'Check the slices of each pie add up to 100% and that every figure you quote is correct.',
    ],
    usefulLanguage: [
      'the proportion of household expenditure devoted to',
      'took up almost a third of the budget',
      'was overtaken by',
      'these positions had been reversed',
      'more than a third of all spending',
      'had almost halved to',
      'was the main gainer',
      'moved in the opposite direction',
      'was virtually unchanged',
      'at 14% and 15% respectively',
      'equalling the share for',
    ],
    models: [
      {
        band: 8.5,
        text:
          'The two pie charts compare the proportion of household expenditure devoted to six categories in one country in 1990 and 2020.\n\n' +
          'Overall, the pattern of spending changed significantly over the thirty years. Food, which was the largest expense in 1990, was overtaken by housing, while the share spent on leisure rose and that spent on clothing fell considerably.\n\n' +
          'In 1990, food took up almost a third of the average budget (30%), with housing in second place at 22%. By 2020, these positions had been reversed: housing costs had risen to 34%, more than a third of all spending, whereas the proportion spent on food had almost halved to 16%.\n\n' +
          'Among the smaller categories, leisure was the main gainer, increasing from 9% to 14%. Clothing moved in the opposite direction, falling from 12% to just 5%, which made it the smallest item in 2020. Transport, by contrast, was virtually unchanged at 14% and 15% respectively, while miscellaneous spending in the \'other\' category grew modestly from 13% to 16%, equalling the share for food by the end of the period.',
        commentary: {
          tr: 'The overview clearly states the most important change (housing overtaking food) and the secondary trends. Every category is covered with accurate figures, and the writer adds insightful comparisons, such as "other" spending equalling food in 2020.',
          cc: 'The response moves logically from the largest to the smallest categories, and comparisons between years are made within sentences rather than across paragraphs. Linkers ("whereas", "by contrast", "while") are varied and used appropriately.',
          lr: 'Precise, natural vocabulary is used throughout: "devoted to", "the main gainer", "virtually unchanged", "almost halved". Fractions and percentages are combined skilfully to avoid repetition.',
          gra: 'The writer controls a wide range of complex structures, including passive past perfect ("had been reversed"), relative clauses and participle clauses. The response is error-free.',
        },
      },
      {
        band: 6,
        text:
          'The pie charts show the spending of households in a country in 1990 and 2020 in six different categories.\n\n' +
          'In 1990, the biggest part was food which was 30%. Housing was 22% and transport was 14%. Other was 13% and clothing was 12%. The lowest was leisure with only 9%. So, in 1990 people spent most of their money for food.\n\n' +
          'In 2020, there were many changes. Housing became the biggest with 34%, it increased 12%. Food decreased a lot to 16%, which was almost half of 1990. Leisure increased to 14% and transport increased a little to 15%. Clothing was decrease from 12% to 5% and it became the smallest. Other was 16%, the same as food. This means people spent more on housing than food.\n\n' +
          'Overall, people spent more money for housing and leisure and less money for food and clothing in 2020 than 1990. Transport did not change very much. Housing and food changed the most in these thirty years.',
        commentary: {
          tr: 'All six categories are covered with accurate figures, and the main changes are identified. However, the first body paragraph simply lists the 1990 figures, and the overview at the end describes "more money" rather than a larger proportion, which misrepresents what the charts show.',
          cc: 'The two-year structure is easy to follow but leads to listing, and comparisons are only made in the second body paragraph. Linking is basic ("So", "Overall") and relies heavily on repeated sentence patterns ("X was Y%").',
          lr: 'The vocabulary range is limited and repetitive ("increased" appears three times). "It increased 12%" confuses percentage points with a percentage increase, and "spent… money for food" is a collocation error.',
          gra: 'Some complex sentences are attempted with relative clauses ("which was almost half of 1990"), but there are errors such as "Clothing was decrease" and comma splices. Errors do not seriously reduce clarity.',
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* w1-06 TABLE — household waste treatment                              */
  /* ------------------------------------------------------------------ */
  {
    id: 'w1-06',
    task: 1,
    module: 'academic',
    type: 'table',
    topic: 'Environment and waste',
    prompt:
      'You should spend about 20 minutes on this task.\n\nThe table below shows how household waste was treated in five European countries in 2022.\n\n' +
      ACADEMIC_INSTRUCTION,
    visual: {
      kind: 'table',
      title: 'Treatment of household waste in five countries, 2022 (% of total)',
      headers: ['Country', 'Recycled', 'Composted', 'Incinerated', 'Landfill'],
      rows: [
        ['Austria', 34, 24, 39, 3],
        ['Norway', 27, 12, 55, 6],
        ['Ireland', 28, 14, 40, 18],
        ['Portugal', 15, 13, 21, 51],
        ['Greece', 12, 5, 1, 82],
      ],
    },
    plan: [
      'Introduction: paraphrase "treated" as "dealt with / disposed of" and mention four methods and five countries in 2022.',
      'Overview: the countries split into two groups — Austria, Norway and Ireland rely on incineration and recycling with little landfill; Portugal and Greece rely mainly on landfill.',
      'Body 1 — the low-landfill group: Austria (highest recycling 34%, composting 24%, landfill only 3%); Norway (highest incineration 55%); Ireland similar pattern but 18% landfill.',
      'Body 2 — the landfill-dependent group: Greece (82% landfill, 1% incineration, lowest recycling 12% and composting 5%); Portugal (51% landfill, recycling 15%).',
      'Look for the highest and lowest value in each column — these are the comparisons examiners expect in a table.',
      'Do not try to report all 20 numbers; around 12–14 well-chosen figures are enough.',
      'Check that each row adds up to 100% and that the "highest/lowest" claims are true.',
    ],
    usefulLanguage: [
      'fell into two distinct groups',
      'relied mainly on',
      'was by far the dominant method',
      'the most balanced profile',
      'the highest figure in the table',
      'almost a quarter',
      'ending up in landfill',
      'followed a similar pattern on a smaller scale',
      'at the other end of the scale',
      'buried … of its household waste',
      'sent just over half of its waste to landfill',
    ],
    models: [
      {
        band: 8.5,
        text:
          'The table shows how household waste was dealt with in five European countries in 2022, broken down into four methods of disposal.\n\n' +
          'Overall, the countries fell into two distinct groups. Austria, Norway and Ireland relied mainly on incineration and recycling and sent relatively little waste to landfill, whereas landfill was by far the dominant method in Portugal and Greece.\n\n' +
          'Austria had the most balanced profile. It recycled 34% of its waste, the highest figure in the table, and composted almost a quarter (24%), with only 3% ending up in landfill. Norway incinerated more than half of its rubbish (55%), the largest share for this method, while recycling 27% and composting 12%. Ireland followed a similar pattern on a smaller scale, incinerating 40% and recycling 28%, although it landfilled a notably higher proportion (18%).\n\n' +
          'At the other end of the scale, Greece buried 82% of its household waste and burned almost none (1%). Its recycling and composting rates, at 12% and 5%, were the lowest of the five countries. Portugal was in a slightly better position, but it still sent just over half of its waste (51%) to landfill and recycled only 15%.',
        commentary: {
          tr: 'The overview identifies a meaningful grouping of the countries, which is exactly what a strong table response should do. Highest and lowest values in each column are accurately highlighted (Austria for recycling, Norway for incineration, Greece for landfill), and all figures are correct.',
          cc: 'Organising the body paragraphs around the two groups gives the response a clear, logical structure. Phrases such as "At the other end of the scale" and "followed a similar pattern" link the paragraphs and countries smoothly.',
          lr: 'The writer uses a broad range of topic-specific vocabulary ("incinerated", "landfilled", "methods of disposal") and paraphrases naturally ("buried", "burned almost none", "rubbish"). Collocations such as "a notably higher proportion" are accurate.',
          gra: 'Complex sentences with participle clauses, appositive phrases ("the highest figure in the table") and concessive clauses are handled with full control. The response is error-free.',
        },
      },
      {
        band: 6,
        text:
          'The table shows the percentage of household waste which is recycled, composted, incinerated and put in landfill in five countries in 2022.\n\n' +
          'Firstly, Austria recycled 34% of waste and it is the highest. It also composted 24% and incinerated 39%. Only 3% go to landfill. Norway recycled 27%, composted 12% and incinerated 55% which is the highest in the table. Ireland is similar, it recycled 28% and incinerated 40%, but landfill was 18%. Ireland composted 14%.\n\n' +
          'Secondly, Portugal and Greece used landfill very much. In Portugal 51% of waste went to landfill and in Greece it was 82%. Greece incinerated only 1% and it recycled 12% and composted 5%. Portugal recycled 15%, composted 13% and incinerated 21%. Both countries recycled less than 20% of waste.\n\n' +
          'In conclusion, Austria is the best country for recycling and Greece is the worst country because it use landfill the most. Norway incinerated the most and other countries are between them.',
        commentary: {
          tr: 'The figures are accurate and the grouping of Portugal and Greece is sensible, but there is no overview until the conclusion, which is evaluative ("the best country", "the worst country") rather than a summary of the data. Some sentences simply list a country\'s row of figures without comparison.',
          cc: 'The response has a basic structure, but "Firstly… Secondly… In conclusion" is mechanical. A comma splice ("Ireland is similar, it recycled…") and long lists reduce fluency.',
          lr: 'The key topic words (recycled, composted, incinerated) are taken from the table, with little attempt to paraphrase. Expressions such as "used landfill very much" are unnatural.',
          gra: 'Tenses switch inconsistently between past and present ("recycled… it is the highest… 3% go to landfill"), and there are agreement errors ("it use"). Sentence structures are mostly simple.',
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* w1-07 PROCESS — olive oil production                                 */
  /* ------------------------------------------------------------------ */
  {
    id: 'w1-07',
    task: 1,
    module: 'academic',
    type: 'process',
    topic: 'Food production',
    prompt:
      'You should spend about 20 minutes on this task.\n\nThe diagram below shows the stages in the production of olive oil.\n\n' +
      ACADEMIC_INSTRUCTION,
    visual: {
      kind: 'process',
      title: 'How olive oil is produced',
      steps: [
        'Olives are harvested from the trees by hand or with mechanical shakers',
        'Leaves and twigs are removed and the olives are washed in cold water',
        'The whole olives, including the stones, are crushed into a paste by steel rollers',
        'The paste is mixed slowly for 30–40 minutes so that the oil droplets combine',
        'A centrifuge separates the oil from the water and the solid waste (pomace)',
        'The pomace is dried and sold as fuel or fertiliser',
        'The oil is left to settle for several weeks and is then filtered',
        'The filtered oil is bottled in dark glass, labelled and stored in cool conditions before distribution',
      ],
    },
    plan: [
      'Introduction: paraphrase "the stages in the production of olive oil" as "the process by which olive oil is produced, from harvesting to distribution".',
      'Overview: state the number of stages (eight), group them into phases (preparation, extraction, refining and packaging) and mention the by-product (pomace).',
      'Body 1 — preparation: harvesting (by hand or mechanical shakers), removing leaves and washing, crushing whole olives into paste, mixing for 30–40 minutes.',
      'Body 2 — extraction and finishing: centrifuge separates oil, water and pomace; pomace dried and sold as fuel/fertiliser; oil settles for weeks and is filtered; bottled in dark glass, labelled and stored cool.',
      'Use the passive voice for most steps (are harvested, is filtered) because the focus is on the process, not on who does it.',
      'Vary sequencers (at the beginning, next, once, meanwhile, finally) and use relative clauses to combine steps.',
      'Include every stage — missing a step is the most common Task Achievement problem in process questions.',
    ],
    usefulLanguage: [
      'the process by which … is produced',
      'can be divided into three phases',
      'generates a useful by-product',
      'at the beginning of the process',
      'either by hand or using mechanical shakers',
      'are crushed … to form a paste',
      'to allow the oil droplets to combine',
      'rather than being discarded',
      'is left to settle for several weeks',
      'before being filtered',
      'kept in cool conditions until it is distributed',
    ],
    models: [
      {
        band: 9,
        text:
          'The diagram illustrates the process by which olive oil is produced, from the harvesting of the fruit to the distribution of the finished product.\n\n' +
          'Overall, there are eight main stages, which can be divided into three phases: preparing the olives, extracting the oil, and refining and packaging it. The process also generates a useful by-product, pomace, which is put to further use.\n\n' +
          'At the beginning of the process, olives are picked from the trees, either by hand or using mechanical shakers. Any leaves and twigs are then removed, and the fruit is washed in cold water. Next, the whole olives, stones included, are crushed by steel rollers to form a paste, which is mixed slowly for 30 to 40 minutes to allow the oil droplets to combine.\n\n' +
          'At the extraction stage, a centrifuge separates the oil from the water and the solid waste, known as pomace. Rather than being discarded, this pomace is dried and sold as fuel or fertiliser. Meanwhile, the oil is left to settle for several weeks before being filtered. Finally, it is bottled in dark glass, labelled and kept in cool conditions until it is distributed.',
        commentary: {
          tr: 'Every stage of the diagram is included accurately, including the side branch for pomace. The overview is strong: it gives the number of stages, organises them into phases and highlights the by-product.',
          cc: 'The description follows the process logically and the paragraph break matches the phases named in the overview. Sequencing is varied and natural ("At the beginning of the process", "Meanwhile", "Finally"), and "this pomace" links ideas across sentences.',
          lr: 'Vocabulary is accurate and flexible, with effective paraphrasing of the diagram ("picked" for harvested, "stones included", "rather than being discarded"). Process collocations such as "left to settle" are used naturally.',
          gra: 'The passive is used consistently and accurately, combined with relative clauses, infinitives of purpose and a passive gerund ("being filtered"). The response is error-free.',
        },
      },
      {
        band: 6,
        text:
          'The diagram shows how olive oil is made. There are eight steps in this process.\n\n' +
          'First, the olives are harvested from the trees. People can use their hand or a machine to shake the tree. After that, the leaves and twigs are removed and they wash the olives in cold water. Then, the olives are crushed into paste by steel rollers and the stones are also crushed.\n\n' +
          'After that, the paste is mixed slowly for 30 to 40 minutes. Then, a centrifuge is used to separate oil from water and pomace. The pomace is dried and it is sold for fuel or fertiliser, so it is not wasted.\n\n' +
          'Next step, the oil is settle for several weeks and after that it is filtered. Finally, the oil is put in dark glass bottles and labelled. Then it is stored in a cool place and after that it is distributed.\n\n' +
          'In conclusion, making olive oil has many steps and it is a long process.',
        commentary: {
          tr: 'All stages are included and described accurately, which is the main requirement. However, the overview is minimal ("eight steps", "a long process") and does not identify phases or the by-product, so key features are not clearly highlighted.',
          cc: 'The steps are in the correct order, but sequencing is repetitive and mechanical: "After that" appears three times and "Then" three times. The final paragraph is a one-sentence conclusion that adds nothing.',
          lr: 'Vocabulary is mostly copied from the diagram with little paraphrase. Phrases such as "Next step," and "use their hand" show limited flexibility, and "sold for fuel" is a minor collocation slip.',
          gra: 'The passive is attempted and mostly correct, but there is a mix of active and passive ("they wash the olives") and an error in "the oil is settle". Sentences are mainly simple or joined with "and".',
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* w1-08 MAP — Port Hallam 1995 vs 2025                                 */
  /* ------------------------------------------------------------------ */
  {
    id: 'w1-08',
    task: 1,
    module: 'academic',
    type: 'map',
    topic: 'Town development',
    prompt:
      'You should spend about 20 minutes on this task.\n\nThe maps below show the coastal town of Port Hallam in 1995 and in 2025.\n\n' +
      ACADEMIC_INSTRUCTION,
    visual: {
      kind: 'map',
      title: 'Port Hallam, 1995 and 2025',
      before: {
        label: '1995',
        features: [
          'Fishing harbour with a small fleet of boats in the east',
          'Fish market beside the harbour',
          "Row of fishermen's cottages along the coast road",
          'Farmland to the north of the town',
          'Railway station in the town centre',
          'Narrow beach with no facilities in the west',
          'Single road connecting the town to the motorway',
        ],
      },
      after: {
        label: '2025',
        features: [
          'Harbour converted into a marina for leisure yachts',
          'Fish market replaced by seafood restaurants and shops',
          'Cottages kept, now used as holiday rentals',
          'Housing estate and primary school on the former farmland in the north',
          'Railway station closed; the site is now a car park',
          'Widened beach with a promenade, a café and a lifeguard station',
          'Road widened to two lanes, with a new roundabout at the town entrance',
        ],
      },
    },
    plan: [
      'Introduction: paraphrase as "the changes that took place in the coastal town of Port Hallam between 1995 and 2025".',
      'Overview: the town changed from a fishing community into a tourist and residential centre; fishing and rail facilities disappeared, while housing, leisure amenities and better road access were added; the cottages are the main feature that remained.',
      'Body 1 — the coast: harbour → marina; fish market → restaurants and shops; cottages kept but now holiday rentals; narrow beach → widened with promenade, café and lifeguard station.',
      'Body 2 — inland: farmland → housing estate and primary school; railway station → car park; single road widened to two lanes with a roundabout.',
      'Group changes by area (coast vs inland) and use location language (in the east, to the north, in the town centre).',
      'Use past simple passive for changes (was converted, was replaced) and present tense only for what exists now ("are now used as").',
      'Make sure all seven features are mentioned — maps are easy to under-report.',
    ],
    usefulLanguage: [
      'was transformed from … into …',
      'was converted into',
      'was replaced by',
      'made way for',
      'survived, but are now used as',
      'was widened and given',
      'its site became',
      'was built at the entrance to the town',
      'the most dramatic changes occurred',
      'in the east / to the north of / in the town centre',
      'new leisure amenities were introduced',
    ],
    models: [
      {
        band: 8.5,
        text:
          'The maps illustrate the changes that took place in the coastal town of Port Hallam between 1995 and 2025.\n\n' +
          'Overall, the town was transformed from a small fishing community into a tourist and residential centre. Most of the original facilities linked to fishing and rail travel disappeared, while new housing, leisure amenities and improved road access were introduced.\n\n' +
          'The most dramatic changes occurred along the coast. The fishing harbour in the east was converted into a marina for leisure yachts, and the fish market beside it was replaced by seafood restaurants and shops. The row of fishermen\'s cottages on the coast road survived, but these buildings are now used as holiday rentals. In the west, the narrow beach, which previously had no facilities, was widened and given a promenade, a café and a lifeguard station.\n\n' +
          'Inland, the farmland to the north of the town made way for a housing estate and a primary school. The railway station in the town centre closed and its site became a car park. Finally, the single road linking Port Hallam to the motorway was widened to two lanes, and a roundabout was built at the entrance to the town.',
        commentary: {
          tr: 'All seven changes are reported accurately, and the overview gives an insightful summary of how the character of the town changed. Features that remained (the cottages) are distinguished from those that were removed or replaced.',
          cc: 'Changes are grouped by area (coast and inland), and location language guides the reader around the map. Referencing ("the fish market beside it", "these buildings", "its site") is precise and avoids repetition.',
          lr: 'A wide range of vocabulary for change is used ("was transformed", "made way for", "was converted into", "survived"), alongside accurate topic vocabulary ("leisure amenities", "marina", "promenade").',
          gra: 'The writer moves accurately between past passive for changes and present simple for the current situation ("are now used as"). Relative and participle clauses are well controlled and there are no errors.',
        },
      },
      {
        band: 6,
        text:
          'The maps show the town of Port Hallam in 1995 and 2025. There are many changes in this town.\n\n' +
          'In 1995, there was a fishing harbour with small boats in the east and a fish market next to it. There were also fishermen\'s cottages along the coast road and farmland in the north. The railway station was in the town centre and there was a narrow beach in the west.\n\n' +
          'In 2025, the harbour became a marina for yachts and the fish market was replaced by seafood restaurants and shops. The cottages are still there but now they are holiday rentals. The farmland was changed to a housing estate and a primary school was built. Moreover, the railway station was closed and it became car park. The beach is wider and it has a promenade, café and lifeguard station. The road was widened and there is a new roundabout.\n\n' +
          'In conclusion, the town has changed a lot.',
        commentary: {
          tr: 'Most features are covered accurately, but the road to the motorway is not described in 1995, and the overview ("the town has changed a lot") is too vague to summarise the main changes. The response does not explain the overall shift from fishing to tourism and housing.',
          cc: 'Describing each map in a separate paragraph means the first body paragraph is pure description with no comparison, and the reader must link the two paragraphs. Linking is limited to "also", "Moreover" and "and".',
          lr: 'Vocabulary is adequate for the task and some appropriate change verbs are used ("was replaced by", "was widened"). However, the range is narrow ("became" is repeated) and "was changed to" is less natural than "was turned into".',
          gra: 'The passive is used with reasonable accuracy, but there are article omissions ("became car park", "a promenade, café") and a sometimes inconsistent mix of tenses. Sentences are mostly simple or compound.',
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* w1-09 MIXED — cinema admissions (bar) + genre table                  */
  /* ------------------------------------------------------------------ */
  {
    id: 'w1-09',
    task: 1,
    module: 'academic',
    type: 'mixed',
    topic: 'Entertainment',
    prompt:
      'You should spend about 20 minutes on this task.\n\nThe bar chart below shows the number of cinema admissions in one country between 2016 and 2024, and the table shows the share of 2024 admissions by film genre.\n\n' +
      'Table: Share of cinema admissions by genre, 2024 — Action/adventure 38% | Animation 22% | Comedy 17% | Drama 12% | Horror 8% | Other 3%\n\n' +
      ACADEMIC_INSTRUCTION,
    visual: {
      kind: 'bar',
      title: 'Annual cinema admissions in one country, 2016–2024',
      xLabel: 'Year',
      yLabel: 'Admissions (millions)',
      categories: ['2016', '2018', '2020', '2022', '2024'],
      series: [{ name: 'Cinema admissions', values: [168, 177, 44, 117, 131] }],
    },
    plan: [
      'Introduction: one sentence that paraphrases BOTH visuals — the bar chart (cinema tickets sold every two years, 2016–2024) and the table (breakdown of 2024 admissions by genre).',
      'Overview: one point for each visual — attendance collapsed in 2020 and had not fully recovered by 2024; action/adventure was clearly the most popular genre in 2024.',
      'Body 1 — the bar chart: 168m (2016) → 177m peak (2018) → 44m (2020, about a quarter of 2018) → recovery to 117m (2022) and 131m (2024), still 46m below the peak.',
      'Body 2 — the table: action/adventure 38%, animation 22% (together three-fifths), comedy 17%, drama 12%, horror 8%, other 3%.',
      'Give the two visuals roughly equal attention; a link between them is a bonus but not essential.',
      'Do not speculate about the reason for the 2020 fall — report the data only.',
      'Check the derived figures: 177 − 131 = 46; 38 + 22 = 60%.',
    ],
    usefulLanguage: [
      'while the table breaks down … by …',
      'collapsed in 2020',
      'despite a strong recovery',
      'had not returned to its earlier level',
      'stood at … million',
      'plunged to just',
      'roughly a quarter of',
      'picked up considerably',
      'still … below the peak',
      'showed a clear preference for',
      'together made up three-fifths of',
      'attracted relatively small audiences',
    ],
    models: [
      {
        band: 8.5,
        text:
          'The bar chart illustrates how many cinema tickets were sold in one country every two years between 2016 and 2024, while the table breaks down the 2024 admissions by type of film.\n\n' +
          'Overall, cinema attendance collapsed in 2020 and, despite a strong recovery, had not returned to its earlier level by 2024. In that year, audiences showed a clear preference for action and adventure films, which accounted for more admissions than any other genre.\n\n' +
          'Admissions stood at 168 million in 2016 and rose slightly to 177 million in 2018. In 2020, however, the figure plunged to just 44 million, roughly a quarter of the 2018 total. Attendance then picked up considerably, reaching 117 million in 2022 and 131 million in 2024, although this was still 46 million below the 2018 peak.\n\n' +
          'As for genres, action and adventure films attracted 38% of all cinema-goers in 2024, while animation was the second most popular category with 22%. Together, these two genres made up three-fifths of admissions. Comedy accounted for 17% and drama for 12%, whereas horror films (8%) and other genres (3%) attracted relatively small audiences.',
        commentary: {
          tr: 'Both visuals are summarised fully and in balance, and the overview contains a clear point about each. All figures are correct, and derived comparisons (a quarter of the 2018 total, 46 million below the peak, three-fifths of admissions) are accurate and add insight.',
          cc: 'One paragraph is devoted to each visual, and the transitions are smooth ("In that year", "As for genres"). Cohesive devices such as "however" and "Together, these two genres" are used naturally.',
          lr: 'Vocabulary is precise and varied: "plunged", "picked up considerably", "showed a clear preference for", "cinema-goers". The writer avoids repeating "admissions" by using "attendance", "tickets" and "audiences".',
          gra: 'A wide range of structures is used accurately, including past perfect, participle clauses and ellipsis ("and drama for 12%"). The response is error-free.',
        },
      },
      {
        band: 6,
        text:
          'The bar chart shows the cinema admissions in a country from 2016 to 2024 and the table shows the genres of films in 2024.\n\n' +
          'In 2016 there was 168 million admissions and in 2018 it increased to 177 million. However, in 2020 it decreased dramatically to 44 million. This was the lowest number in the chart. After that, in 2022 it increased again to 117 million and in 2024 it was 131 million. But it was still lower than 2016 and 2018.\n\n' +
          'According to the table, action and adventure was the most popular genre with 38%. Animation was 22% and comedy was 17%. Drama was 12% and horror was 8%. Other films were only 3%. So action and adventure and animation were more than half of the admissions.\n\n' +
          'To conclude, the cinema admissions went down in 2020 but then they went up again. People like action and adventure films the most.',
        commentary: {
          tr: 'Both visuals are covered with accurate figures, and the writer notices that 2024 was still lower than 2016 and 2018. However, the overview is only at the end and is very general, and the table paragraph lists every genre with little comparison.',
          cc: 'Each visual has its own paragraph, which is helpful, but linking is basic ("After that", "But", "So") and the table paragraph is a list of short sentences. Pronoun reference ("it increased") is sometimes vague.',
          lr: 'The vocabulary is adequate but limited, with "increased" repeated and few alternatives. "Decreased dramatically" is appropriate, but the range is not wide enough for a higher band.',
          gra: 'There are agreement errors ("there was 168 million admissions") and the present tense in "People like" conflicts with past data. Most sentences are simple, but meaning is always clear.',
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* w1-10 GT FORMAL — complaint to council about a park                  */
  /* ------------------------------------------------------------------ */
  {
    id: 'w1-10',
    task: 1,
    module: 'general',
    type: 'letter-formal',
    topic: 'Local community',
    prompt:
      'You should spend about 20 minutes on this task.\n\nA public park near your home has become poorly maintained. Write a letter to your local council.\n\nIn your letter\n\n• describe the park and how you use it\n• explain what the problems are\n• suggest what the council should do\n\nWrite at least 150 words.\n\nYou do NOT need to write any addresses.\n\nBegin your letter as follows:\n\nDear ……………,',
    plan: [
      'Salutation and register: you do not know the reader, so write "Dear Sir or Madam," and finish with "Yours faithfully," followed by your full name. Use a formal tone with no contractions.',
      'Opening paragraph: state the purpose in one sentence — you are writing about the condition of a named park (invent a name and location) and how long you have used it.',
      'Bullet 1 paragraph: briefly describe the park (playground, lawn, paths, river) and give two or three specific ways you and others use it.',
      'Bullet 2 paragraph: give two or three concrete problems with details (bins not emptied, broken swings since spring, streetlights not working) and their effect (unsafe after dark).',
      'Bullet 3 paragraph: make polite but firm suggestions with specifics (litter collection twice a week, repair equipment and lighting as a priority) and add one extra idea.',
      'Closing: one sentence requesting a response, then "Yours faithfully," and your name.',
      'Check that all three bullets are covered in roughly equal depth and that the letter is 170–200 words.',
    ],
    usefulLanguage: [
      'I am writing to draw your attention to',
      'the deteriorating condition of',
      'a valuable green space in our neighbourhood',
      'has been seriously neglected',
      'the litter bins are rarely emptied',
      'has been broken since',
      'makes the park feel unsafe after dark',
      'I would therefore urge the council to',
      'as a matter of priority',
      'It might also be worth',
      'I look forward to hearing what action you intend to take.',
      'Yours faithfully,',
    ],
    models: [
      {
        band: 8.5,
        text:
          'Dear Sir or Madam,\n\n' +
          'I am writing to draw your attention to the deteriorating condition of Riverside Park on Elm Road, which I have used almost daily for the past six years.\n\n' +
          'The park is a valuable green space in our neighbourhood. I walk my dog there every morning, and at weekends my children use the playground and the open lawn beside the river. Many elderly residents also rely on the benches and paths for gentle exercise.\n\n' +
          'Unfortunately, over the last few months the park has been seriously neglected. The litter bins are rarely emptied, so rubbish is now scattered across the grass. Two of the swings in the playground have been broken since the spring, and several streetlights along the main path no longer work, which makes the park feel unsafe after dark.\n\n' +
          'I would therefore urge the council to increase litter collection to at least twice a week and to repair the playground equipment and lighting as a matter of priority. It might also be worth installing a notice board so that residents can report problems directly.\n\n' +
          'I look forward to hearing what action you intend to take.\n\n' +
          'Yours faithfully,\n\nDaniel Pham',
        commentary: {
          tr: 'All three bullet points are fully addressed and well extended with relevant, specific details (the dog walking, the broken swings, the faulty streetlights). The purpose is clear from the first sentence, and the tone is consistently formal and polite but firm.',
          cc: 'Each paragraph corresponds to one bullet point, and ideas are logically sequenced within paragraphs. Cohesive devices such as "Unfortunately", "therefore" and "so that" are used naturally rather than mechanically.',
          lr: 'Vocabulary is precise and appropriate for a formal complaint ("deteriorating condition", "seriously neglected", "as a matter of priority"). Collocations such as "draw your attention to" and "urge the council to" are natural and accurate.',
          gra: 'A wide range of structures is used accurately, including present perfect for ongoing problems ("have been broken since the spring"), relative clauses and purpose clauses. There are no errors.',
        },
      },
      {
        band: 6,
        text:
          'Dear Sir or Madam,\n\n' +
          'I am writing this letter to complain about the park near my house, it is called Green Hill Park. The park is not good now and I want you to do something.\n\n' +
          'The park is very big and it has a lake, many trees and a playground. I usually go to the park for jogging in the morning and sometimes I go with my family on Sunday. It is very good place for relax.\n\n' +
          'However, now there are many problems in the park. Firstly, there is a lot of rubbish everywhere because nobody clean it. Secondly, the toilets are broken and very dirty. Thirdly, the grass is very long and the children can not play football.\n\n' +
          'I think the council should send more workers to clean the park every day. Also you should repair the toilets and cut the grass. If you do this, many people will be happy.\n\n' +
          'I hope you will reply me soon.\n\n' +
          'Yours faithfully,\n\nMinh Tran',
        commentary: {
          tr: 'All three bullet points are covered, and the purpose of the letter is clear. However, the details are fairly general, and the tone is sometimes too direct for a formal letter ("I want you to do something"), so the register is not consistently appropriate.',
          cc: 'Paragraphing follows the bullets, but linking within the problems paragraph is mechanical ("Firstly… Secondly… Thirdly"). A comma splice in the first sentence ("my house, it is called…") weakens cohesion.',
          lr: 'Vocabulary is sufficient to communicate the problems, but it is simple and repetitive ("very big", "very good", "very dirty"). There are errors in word choice and form, such as "a good place for relax" and "reply me".',
          gra: 'Simple and compound sentences dominate, with a few correct complex sentences ("If you do this, many people will be happy"). Errors such as "nobody clean it" and missing articles are frequent but do not cause misunderstanding.',
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* w1-11 GT SEMI-FORMAL — building work, letter to neighbour            */
  /* ------------------------------------------------------------------ */
  {
    id: 'w1-11',
    task: 1,
    module: 'general',
    type: 'letter-semi-formal',
    topic: 'Neighbours and home',
    prompt:
      'You should spend about 20 minutes on this task.\n\nYou are planning to have some building work done on your home. Write a letter to your neighbour, whom you do not know well.\n\nIn your letter\n\n• explain what work is going to be done\n• describe how it might affect your neighbour\n• say what you will do to reduce any problems\n\nWrite at least 150 words.\n\nYou do NOT need to write any addresses.\n\nBegin your letter as follows:\n\nDear ……………,',
    plan: [
      'Salutation and register: you know the neighbour\'s name but not the person, so use "Dear Mr/Mrs + surname," and end with "Kind regards," or "Yours sincerely," plus your full name. A polite, friendly tone is right; occasional contractions are acceptable.',
      'Opening: introduce yourself (name and house number) and state the purpose — to inform them about upcoming building work and apologise in advance.',
      'Bullet 1: explain exactly what the work is (e.g. a kitchen extension at the back), when it starts and how long it will take.',
      'Bullet 2: describe two or three realistic effects — noise in certain phases, a skip outside, delivery lorries blocking the road.',
      'Bullet 3: give concrete actions to reduce problems — limited working hours, no weekend work, daily cleaning, and a phone number to contact you.',
      'Closing: thank them for their patience and sign off appropriately.',
      'Check that the tone is considerate (not demanding) and that the letter is about 180–200 words.',
    ],
    usefulLanguage: [
      "I'm writing to let you know about",
      'which I\'m afraid may cause a little disruption',
      'a single-storey extension at the back of',
      'the builders estimate that the project will take',
      'there is likely to be some noise',
      'particularly in the first fortnight',
      'may occasionally block part of the road',
      'to keep the inconvenience to a minimum',
      'we have asked the builders to',
      "please don't hesitate to",
      'Thank you in advance for your patience.',
      'Kind regards,',
    ],
    models: [
      {
        band: 8.5,
        text:
          'Dear Mr Collins,\n\n' +
          'My name is Sarah Lim and I live at number 14, two doors down from you. I\'m writing to let you know about some building work we are having done on our house, which I\'m afraid may cause a little disruption.\n\n' +
          'From 3 March, a local firm will be building a single-storey extension at the back of our house to create a larger kitchen. The builders estimate that the project will take about six weeks.\n\n' +
          'There is likely to be some noise during working hours, particularly in the first fortnight when the old wall is knocked down and the foundations are dug. There will also be a skip outside our house, and delivery lorries may occasionally block part of the road for short periods.\n\n' +
          'To keep the inconvenience to a minimum, we have asked the builders to work only between 8 a.m. and 5 p.m. on weekdays and never at weekends. They will also clean the pavement at the end of each day. If anything causes you a problem, please don\'t hesitate to knock on our door or call me on 07700 900123.\n\n' +
          'Thank you in advance for your patience.\n\n' +
          'Kind regards,\n\nSarah Lim',
        commentary: {
          tr: 'All three bullets are fully covered with specific, realistic details (start date, duration, the noisiest phase, working hours). The semi-formal register is ideal: polite and considerate, with a few contractions that suit a letter to a neighbour.',
          cc: 'The letter is well organised, with a clear purpose in the opening and one paragraph per bullet. Ideas are linked smoothly ("There will also be…", "To keep the inconvenience to a minimum") without over-use of connectors.',
          lr: 'Vocabulary is precise and natural for the context ("single-storey extension", "skip", "first fortnight", "keep the inconvenience to a minimum"). Polite softeners such as "I\'m afraid" and "may occasionally" show sensitivity to the reader.',
          gra: 'A range of structures is used accurately, including the causative ("having done"), future continuous ("will be building") and passives in a time clause. There are no errors.',
        },
      },
      {
        band: 6,
        text:
          'Dear Mr Collins,\n\n' +
          'I am your neighbour from number 14 and my name is Sarah. I am writing to tell you that we will have some building work in our house soon.\n\n' +
          'We want to make our kitchen bigger, so the builders will build a extension at the back of the house. The work will start on 3 March and it will take about six weeks.\n\n' +
          'I think the work will be noisy and maybe it will disturb you, especially in the morning. Also there will be a big skip in front of our house and some lorries will come to bring the materials, so sometime it is difficult to park your car.\n\n' +
          'I will ask the builders to work only from 8am to 5pm and they will not work in the weekend. Moreover, they will clean the street every day. If you have any problem, you can call me anytime.\n\n' +
          'I am sorry for the inconvenience and thank you for understanding.\n\n' +
          'Best regards,\n\nSarah',
        commentary: {
          tr: 'All three bullet points are addressed with relevant information, and the purpose is clear. However, some ideas are underdeveloped (no contact number is given despite "you can call me"), and signing only with a first name is slightly too informal for a neighbour the writer does not know well.',
          cc: 'Paragraphing follows the bullets logically. Linking is adequate but limited to simple devices ("so", "Also", "Moreover"), and sentences are often joined with "and".',
          lr: 'Vocabulary is generally appropriate ("skip", "inconvenience"), but the range is limited and there are some errors ("a extension", "sometime" for "sometimes", "in the weekend").',
          gra: 'The writer uses mainly simple future forms and a few conditional and result clauses. Errors in articles and prepositions are noticeable but do not impede communication.',
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* w1-12 GT INFORMAL — declining a wedding invitation                   */
  /* ------------------------------------------------------------------ */
  {
    id: 'w1-12',
    task: 1,
    module: 'general',
    type: 'letter-informal',
    topic: 'Friends and celebrations',
    prompt:
      'You should spend about 20 minutes on this task.\n\nA friend has invited you to their wedding, but you are unable to attend. Write a letter to your friend.\n\nIn your letter\n\n• thank your friend for the invitation\n• explain why you cannot attend\n• suggest how you could celebrate together at another time\n\nWrite at least 150 words.\n\nYou do NOT need to write any addresses.\n\nBegin your letter as follows:\n\nDear ……………,',
    plan: [
      'Salutation and register: use the friend\'s first name ("Dear Emma,") and finish warmly ("Lots of love," / "Best wishes,") with your first name only. Use contractions, phrasal verbs and idioms to sound natural.',
      'Bullet 1: thank your friend with genuine enthusiasm and add a personal memory to show the relationship is real.',
      'Bullet 2: break the news gently, then give a specific, believable reason (e.g. compulsory work training abroad with dates) and show you tried to change it.',
      'Bullet 3: make one or two concrete suggestions (they visit you after the honeymoon; you take them out for dinner) with details that make the plan sound appealing.',
      'Closing: send good wishes for the big day.',
      'Avoid formal phrases such as "I am writing to inform you" or "I regret to say" — they sound cold in a letter to a close friend.',
      'Check that each bullet has at least two or three sentences and the letter is 170–200 words.',
    ],
    usefulLanguage: [
      'Thank you so much for the beautiful invitation',
      'I was absolutely thrilled to hear that',
      'tying the knot',
      "I'm gutted to tell you that",
      "I won't be able to make it",
      'there was no way round it',
      "I'd hate to miss out completely",
      'how about this:',
      "why don't you both come and stay",
      'my treat',
      "I'll be thinking of you on the big day.",
      'Lots of love,',
    ],
    models: [
      {
        band: 9,
        text:
          'Dear Emma,\n\n' +
          'Thank you so much for the beautiful invitation – I was absolutely thrilled to hear that you and Tom are finally tying the knot! I still remember you telling me about your first date at that terrible karaoke bar, so it\'s wonderful to see how far you\'ve come.\n\n' +
          'That\'s why I\'m gutted to tell you that I won\'t be able to make it on the 14th. My company is sending me to Singapore for a three-week training programme that starts on the 10th, and unfortunately it\'s compulsory for everyone in my new role. I tried to rearrange it, but there was no way round it.\n\n' +
          'I\'d hate to miss out completely, though, so how about this: when you\'re back from your honeymoon, why don\'t you both come and stay with me for a weekend? I\'ll cook that seafood curry you love, and we can look through all the wedding photos together. Alternatively, I could come up to you and take you both out for a celebratory dinner – my treat.\n\n' +
          'I\'ll be thinking of you on the big day. Have a fantastic time!\n\n' +
          'Lots of love,\n\nLinh',
        commentary: {
          tr: 'All three bullets are fully developed with vivid, personal details (the karaoke date, the Singapore training, the seafood curry). The informal tone is consistent and entirely appropriate for a close friend, and the letter reads as genuine and warm.',
          cc: 'The letter flows naturally, with each paragraph linked to the previous one ("That\'s why…", "I\'d hate to miss out completely, though"). Cohesion is achieved through natural spoken-style connectors rather than formal linkers.',
          lr: 'Idiomatic language is used skilfully and appropriately ("tying the knot", "gutted", "no way round it", "my treat"). Vocabulary choices consistently match the informal register.',
          gra: 'A wide range of structures is used with full flexibility, including present continuous for future arrangements, suggestions with "why don\'t you" and "how about", and modal verbs. The text is error-free.',
        },
      },
      {
        band: 6,
        text:
          'Dear Emma,\n\n' +
          'How are you? Thank you very much for your invitation to your wedding. I am very happy for you and Tom and I am sure it will be a beautiful wedding.\n\n' +
          'But I am really sorry because I can not come to your wedding. My company send me to Singapore for training on 10th and I have to stay there for three weeks. It is very important for my job so I can not change it. I feel very sad about this.\n\n' +
          'I have an idea for celebrating together. When you come back from your honeymoon, you and Tom can visit my house for one weekend. I will cook delicious food for you and we can see your wedding photos together. Or we can go to a nice restaurant and I will pay for dinner.\n\n' +
          'I hope you have a wonderful day and I will send you a present. I also hope to meet you very soon.\n\n' +
          'Best wishes,\n\nLinh',
        commentary: {
          tr: 'All three bullet points are addressed and the reason for not attending is clear. However, the content is quite general, with few personal details, and the tone, while friendly, is rather flat and neutral for a letter to a close friend.',
          cc: 'The letter is logically organised with one paragraph per bullet. Linking is basic ("But", "so", "Or") and the word "wedding" is repeated three times in the first two paragraphs instead of using reference.',
          lr: 'Vocabulary is adequate for the task but simple and repetitive ("very happy", "very important", "very sad"). There are no idiomatic expressions, which limits the informal effect; "see your wedding photos" is understandable but less natural than "look through".',
          gra: 'Mostly simple and compound sentences with one or two complex ones ("When you come back…"). There are errors in tense and agreement ("My company send me") and articles ("on 10th"), but they do not impede understanding.',
        },
      },
    ],
  },
];
