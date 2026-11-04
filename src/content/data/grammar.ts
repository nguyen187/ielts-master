import type { GrammarLesson } from '../types';

export const grammarLessons: GrammarLesson[] = [
  /* ------------------------------------------------------------ g01 */
  {
    id: "g01",
    title: "Articles: a, an, the and zero article",
    targetBand: 5.5,
    explanation:
      "Vietnamese has no articles, so many learners either drop **a/an/the** completely or put 'the' in front of every noun. Because articles appear in almost every sentence, examiners notice these errors quickly, and frequent article mistakes keep Grammatical Range and Accuracy at band 5–6.\n\n- **a/an** = one, non-specific, singular countable noun. Choose by sound, not spelling: a university, a European country, an hour, an MBA.\n- **the** = the reader knows exactly which one: it was mentioned before, it is unique (the government, the internet, the environment), or a phrase defines it (the number of students, the proportion of women).\n- **Zero article** = general meaning with plural or uncountable nouns: Unemployment affects young people. Money cannot buy happiness.\n- Superlatives and ordinals take **the**: the highest figure, the second quarter.\n\n**Task 1 rules:** 'the number of / the percentage of / the amount of' always take 'the'. Years and months take no article (in 2010, in May), but decades and periods do (in the 1990s, over the period).\n\n**Quick check before you submit:** every singular countable noun needs a determiner (a, the, my, this, each, one…). If a singular noun such as 'student', 'problem' or 'country' stands alone, you have probably made an error.",
    examples: [
      "The number of international students rose steadily over the period.",
      "The chart compares the proportion of households with internet access in three countries.",
      "Technology has changed the way people communicate.",
      "An hour of exercise a day can reduce the risk of heart disease.",
      "Unemployment remained a serious problem in the 1990s.",
    ],
    commonMistakes: [
      {
        wrong: "Number of tourists increased in 2015.",
        right: "The number of tourists increased in 2015.",
        why: "'The number of' is a fixed phrase: the number is defined by 'of tourists', so it needs 'the'.",
      },
      {
        wrong: "The education is important for the development of the society.",
        right: "Education is important for the development of society.",
        why: "Abstract uncountable nouns used in a general sense (education, society, happiness) take zero article.",
      },
      {
        wrong: "He is student at university in Hanoi.",
        right: "He is a student at a university in Hanoi.",
        why: "Singular countable nouns can never stand alone; Vietnamese has no equivalent, so this error is very common.",
      },
      {
        wrong: "It is a useful information.",
        right: "It is useful information.",
        why: "'Information' is uncountable, so it cannot take 'a/an'.",
      },
      {
        wrong: "Government should invest more in public transport.",
        right: "The government should invest more in public transport.",
        why: "'Government' here means the specific government of the country, and a singular countable noun needs a determiner.",
      },
    ],
    exercises: [
      {
        prompt: "____ number of cars on the road doubled between 2000 and 2020. (a / an / the / – for no article)",
        answer: ["the"],
        explanation: "'The number of' is always used with 'the' because the noun is defined by the 'of' phrase.",
      },
      {
        prompt: "Air pollution is ____ major cause of respiratory disease in big cities. (a / an / the / – for no article)",
        answer: ["a"],
        explanation: "It is one cause among several (non-specific, singular countable), and 'major' begins with a consonant sound.",
      },
      {
        prompt: "It took the workers ____ hour to repair the bridge. (a / an / the / – for no article)",
        answer: ["an"],
        explanation: "The 'h' in 'hour' is silent, so the word begins with a vowel sound and needs 'an'.",
      },
      {
        prompt: "Many people believe that ____ money cannot buy happiness. (a / an / the / – for no article)",
        answer: ["-", "–", "no article", "zero", "zero article", "none", "x", "0"],
        explanation: "'Money' is uncountable and used in a general sense here, so it takes zero article.",
      },
      {
        prompt: "Car sales reached their peak in ____ 1990s. (a / an / the / – for no article)",
        answer: ["the"],
        explanation: "Decades take 'the' (in the 1990s), unlike single years (in 1995).",
      },
      {
        prompt: "Correct the error: Internet has transformed the way students learn. (Write only the corrected phrase.)",
        answer: ["the internet", "the internet has transformed the way students learn", "the internet has transformed the way students learn."],
        explanation: "'The internet' is unique, like 'the environment' or 'the sun', so it needs 'the'.",
      },
      {
        prompt: "Of the four countries, Spain had ____ highest proportion of renewable energy. (a / an / the / – for no article)",
        answer: ["the"],
        explanation: "Superlatives (the highest, the most popular) always take 'the'.",
      },
      {
        prompt: "Germany is ____ European country with a strong manufacturing sector. (a / an / the / – for no article)",
        answer: ["a"],
        explanation: "'European' is spelled with a vowel but begins with the consonant sound /j/ ('you'), so it takes 'a'.",
      },
    ],
  },

  /* ------------------------------------------------------------ g02 */
  {
    id: "g02",
    title: "Countable and uncountable nouns, plurals",
    targetBand: 5.5,
    explanation:
      "Vietnamese nouns do not change in the plural (một sinh viên, nhiều sinh viên), so learners often write 'many student' or 'two country'. In English, a plural countable noun must end in -s or use an irregular plural (people, children, women).\n\nSome nouns that are countable in Vietnamese are **uncountable** in English. The most common in IELTS are: information, advice, research, evidence, equipment, furniture, knowledge, traffic, pollution, accommodation, homework, progress, feedback, transport, money.\n\nUncountable nouns:\n- never take a/an or a plural -s (not 'an advice', not 'researches')\n- take a singular verb (The evidence is clear)\n- use much, little, a great deal of, an amount of\n- can be counted with a unit: a piece of advice, an item of equipment\n\nCountable nouns use many, few, a number of.\n\n**Task 1 essentials:**\n- **the number of** + plural countable (the number of tourists)\n- **the amount of** + uncountable (the amount of water)\n- **one of the** + plural noun + singular verb (One of the main problems is…)\n\n'People' is already plural, so never write 'peoples' unless you mean nations or ethnic groups.",
    examples: [
      "The number of cars rose, while the amount of money spent on public transport fell.",
      "Students need practical advice rather than more information.",
      "There is little evidence that homework improves results in primary schools.",
      "One of the main reasons for this trend is the rising cost of living.",
      "Many people lack the knowledge needed to manage their finances.",
    ],
    commonMistakes: [
      {
        wrong: "There are many student in my class.",
        right: "There are many students in my class.",
        why: "After 'many' the countable noun must be plural; Vietnamese learners often forget the -s because Vietnamese nouns do not change.",
      },
      {
        wrong: "Researchers have collected many evidences.",
        right: "Researchers have collected a great deal of evidence.",
        why: "'Evidence' is uncountable: no plural -s, and use 'much / a great deal of' instead of 'many'.",
      },
      {
        wrong: "The amount of tourists visiting Da Nang increased.",
        right: "The number of tourists visiting Da Nang increased.",
        why: "'Tourists' is countable, so use 'the number of'; 'the amount of' is for uncountable nouns.",
      },
      {
        wrong: "One of the biggest problem is traffic.",
        right: "One of the biggest problems is traffic.",
        why: "'One of the' is followed by a plural noun, but the verb is singular because the subject is 'one'.",
      },
      {
        wrong: "Peoples in my country are very friendly.",
        right: "People in my country are very friendly.",
        why: "'People' is already the plural of 'person'.",
      },
    ],
    exercises: [
      {
        prompt: "The ____ of visitors to the museum fell by 20% in 2019. (number / amount)",
        answer: ["number"],
        explanation: "'Visitors' is a plural countable noun, so it follows 'the number of'.",
      },
      {
        prompt: "The ____ of water used by households rose sharply. (number / amount)",
        answer: ["amount"],
        explanation: "'Water' is uncountable, so it follows 'the amount of'.",
      },
      {
        prompt: "One of the most serious ____ (problem) in big cities is traffic congestion.",
        answer: ["problems"],
        explanation: "'One of the' + superlative + plural noun: one of the most serious problems.",
      },
      {
        prompt: "Correct the error: She gave me some useful advices about the exam. (Write only the corrected word.)",
        answer: ["advice"],
        explanation: "'Advice' is uncountable and never takes -s; to count it, say 'pieces of advice'.",
      },
      {
        prompt: "There isn't ____ evidence that the policy reduced crime. (many / much)",
        answer: ["much"],
        explanation: "'Evidence' is uncountable, so it takes 'much', not 'many'.",
      },
      {
        prompt: "Only a ____ students chose to study abroad. (few / little)",
        answer: ["few"],
        explanation: "'Students' is countable, so use 'a few'; 'a little' is for uncountable nouns.",
      },
      {
        prompt: "Modern hospitals need a lot of expensive ____ (equipment).",
        answer: ["equipment"],
        explanation: "'Equipment' is uncountable, so it has no plural form even after 'a lot of'.",
      },
      {
        prompt: "Correct the error: The city has made a lot of progresses in reducing pollution. (Write only the corrected word.)",
        answer: ["progress"],
        explanation: "'Progress' is uncountable, so it has no plural -s.",
      },
    ],
  },

  /* ------------------------------------------------------------ g03 */
  {
    id: "g03",
    title: "Subject–verb agreement",
    targetBand: 5.5,
    explanation:
      "Vietnamese verbs never change for the subject, so the third-person -s (he works, it shows) is one of the most frequent errors in Vietnamese learners' writing. Examiners count it as a basic accuracy error, even in otherwise good essays.\n\nThe key skill is to **find the head noun** of the subject and ignore everything in between:\n- **The number of** students **has** increased (head = number, singular).\n- **A number of** students **have** complained (= many students, plural).\n- **The percentage** of people who own cars **was** 40%.\n- **One** of the reasons **is**…\n\nOther rules:\n- **Each / every / everyone / nobody** take a singular verb: Every student has a laptop.\n- **Uncountable nouns** are singular: The information is out of date.\n- **-ing subjects** are singular: Studying abroad helps students become independent.\n- **There is / there are** agrees with the noun that follows: There are many reasons.\n- **Neither… nor / either… or**: the verb agrees with the nearer subject.\n- In **relative clauses**, the verb agrees with the noun before 'who/which': people who live, a child who lives.\n\n**Proofreading tip:** in the last two minutes, underline every subject and check its verb. This one habit removes many careless errors.",
    examples: [
      "The number of people living alone has risen steadily since 1990.",
      "A number of experts believe that the policy will fail.",
      "Learning a foreign language takes a great deal of time.",
      "Each of the three cities has a different transport system.",
      "There are several reasons why young people leave rural areas.",
    ],
    commonMistakes: [
      {
        wrong: "The number of students have increased.",
        right: "The number of students has increased.",
        why: "The head noun is 'number' (singular), not 'students'.",
      },
      {
        wrong: "Studying abroad help students become independent.",
        right: "Studying abroad helps students become independent.",
        why: "An -ing subject is singular and needs the third-person -s.",
      },
      {
        wrong: "Every student have a laptop.",
        right: "Every student has a laptop.",
        why: "'Every' and 'each' are followed by a singular verb.",
      },
      {
        wrong: "There is many reasons for this.",
        right: "There are many reasons for this.",
        why: "After 'there', the verb agrees with the noun that follows ('reasons', plural).",
      },
      {
        wrong: "People who lives in cities have better access to healthcare.",
        right: "People who live in cities have better access to healthcare.",
        why: "The relative clause verb agrees with 'people' (plural).",
      },
    ],
    exercises: [
      {
        prompt: "The number of young people who smoke ____ (fall) every year since 2010. (present perfect)",
        answer: ["has fallen"],
        explanation: "The subject is 'the number', which is singular, so use 'has fallen'.",
      },
      {
        prompt: "A number of experts ____ (believe) that the policy will fail. (present simple)",
        answer: ["believe"],
        explanation: "'A number of' means 'many', so the verb is plural.",
      },
      {
        prompt: "Learning a foreign language ____ (take) a great deal of time. (present simple)",
        answer: ["takes"],
        explanation: "An -ing phrase as subject is singular.",
      },
      {
        prompt: "Each of the four countries ____ (have) a different energy policy. (present simple)",
        answer: ["has"],
        explanation: "The head word is 'each', which is singular; 'of the four countries' does not change this.",
      },
      {
        prompt: "There ____ (be) several reasons why people move to cities. (present simple)",
        answer: ["are"],
        explanation: "The verb agrees with 'several reasons', which is plural.",
      },
      {
        prompt: "The information in these reports ____ (be) out of date. (present simple)",
        answer: ["is"],
        explanation: "'Information' is uncountable and singular; 'in these reports' is only a modifier.",
      },
      {
        prompt: "Correct the error: A person who work long hours often suffers from stress. (Write only the corrected verb.)",
        answer: ["works"],
        explanation: "'Who' refers to 'a person' (singular), so the verb is 'works'.",
      },
      {
        prompt: "Neither the teacher nor the students ____ (be) happy with the new timetable. (present simple)",
        answer: ["are"],
        explanation: "With 'neither… nor', the verb agrees with the nearer subject, 'the students' (plural).",
      },
    ],
  },

  /* ------------------------------------------------------------ g04 */
  {
    id: "g04",
    title: "Punctuation: run-on sentences and comma splices",
    targetBand: 6,
    explanation:
      "The band 7 descriptor for Grammatical Range and Accuracy mentions 'good control of grammar and punctuation'. The most common punctuation problem for Vietnamese learners is the **comma splice**: joining two complete sentences with only a comma, because Vietnamese allows commas between clauses much more freely.\n\nWrong: Many people move to cities, they want better jobs.\n\nFive correct ways to join two clauses:\n- **Full stop:** Many people move to cities. They want better jobs.\n- **Semicolon:** Many people move to cities; they want better jobs.\n- **Comma + and / but / so / or / yet:** Rents are high, but many people move to cities.\n- **Subordinator:** Many people move to cities because they want better jobs.\n- **Linking adverb** (however, therefore, moreover): these are NOT conjunctions. Use a full stop or semicolon before them and a comma after: Rents are high; however, people still move to cities.\n\nOther rules:\n- Use a comma after an introductory phrase or clause: In 2020, the figure peaked. When prices rose, demand fell.\n- Do not put a comma before a 'that' clause or between a subject and its verb.\n- Apostrophes: the country's economy (one), the three countries' economies (more than one); 'its' = possessive, 'it's' = it is.",
    examples: [
      "Car ownership rose sharply; however, bus use declined.",
      "Car ownership rose sharply, but bus use declined.",
      "Although car ownership rose sharply, bus use declined.",
      "In 2020, the figure reached its highest point.",
      "Many people believe that working from home improves productivity.",
    ],
    commonMistakes: [
      {
        wrong: "Many people live in cities, they can find better jobs there.",
        right: "Many people live in cities because they can find better jobs there.",
        why: "Two independent clauses cannot be joined by a comma alone (comma splice); use a conjunction, a semicolon or a full stop.",
      },
      {
        wrong: "The price rose, however, demand remained stable.",
        right: "The price rose; however, demand remained stable.",
        why: "'However' is an adverb, not a conjunction, so it needs a semicolon or full stop before it.",
      },
      {
        wrong: "The government should invest in education it is the key to development.",
        right: "The government should invest in education because it is the key to development.",
        why: "This is a run-on sentence: two clauses with no punctuation or conjunction between them.",
      },
      {
        wrong: "Many people think, that money brings happiness.",
        right: "Many people think that money brings happiness.",
        why: "Do not put a comma between a verb and its 'that' clause.",
      },
      {
        wrong: "The company doubled it's profits.",
        right: "The company doubled its profits.",
        why: "'Its' (no apostrophe) is the possessive; 'it's' means 'it is' or 'it has'.",
      },
    ],
    exercises: [
      {
        prompt: "Fees rose sharply, ____ the number of applicants remained stable. (but / however / therefore)",
        answer: ["but"],
        explanation: "After a comma only a coordinating conjunction (and, but, so, or, yet) can join two clauses; 'however' and 'therefore' would create a comma splice.",
      },
      {
        prompt: "Fees rose sharply; ____, the number of applicants remained stable. (but / however / so)",
        answer: ["however"],
        explanation: "The pattern '; ____,' is used with linking adverbs such as 'however'; 'but' and 'so' are not followed by a comma here.",
      },
      {
        prompt: "Online learning is flexible, it is also cheaper than classroom study. Which punctuation mark should replace the comma? (Write the mark or its name.)",
        answer: [";", ".", "semicolon", "a semicolon", "full stop", "a full stop", "period", "a period"],
        explanation: "The two parts are complete sentences, so they need a semicolon or a full stop, not a comma.",
      },
      {
        prompt: "____ public transport is cheap, many people still prefer to drive. (Although / However / But)",
        answer: ["although", "even though", "though"],
        explanation: "Only a subordinator can begin the first clause and be followed by a comma and a main clause.",
      },
      {
        prompt: "Correct the error: The city has improved it's public transport system. (Write only the corrected word.)",
        answer: ["its"],
        explanation: "The possessive is 'its'; 'it's' means 'it is/it has'.",
      },
      {
        prompt: "Correct the error: Most experts agree, that the policy failed. (Write the corrected sentence.)",
        answer: ["most experts agree that the policy failed.", "most experts agree that the policy failed"],
        explanation: "No comma is used between a reporting verb and its 'that' clause.",
      },
      {
        prompt: "Many students work part-time ____ they need to pay their tuition fees. (because / however / , )",
        answer: ["because", "as", "since"],
        explanation: "A subordinator joins the clauses correctly; a comma would create a comma splice and 'however' cannot join clauses.",
      },
      {
        prompt: "Correct the error: The three countries economies grew rapidly. (Write only the corrected word.)",
        answer: ["countries'"],
        explanation: "The economies belong to three countries (plural), so the apostrophe goes after the -s: countries'.",
      },
    ],
  },

  /* ------------------------------------------------------------ g05 */
  {
    id: "g05",
    title: "Tenses for Task 1 data: past, present perfect and future forecasts",
    targetBand: 6,
    explanation:
      "In Academic Task 1, choose the tense from the **time shown on the chart**, not from habit. Mixing tenses randomly is a common reason for a band 5.5 in Grammatical Range and Accuracy.\n\n- **Present simple** to describe the chart itself, or data with no time: The graph shows… / The table compares…; processes: The leaves are dried.\n- **Past simple** for finished past dates: In 2010, sales rose to 5 million. Between 1990 and 2000, the figure fell.\n- **Past perfect** for something completed before a past point: By 2015, the figure had reached 2 million.\n- **Present perfect** only when the period continues to now: Since 2010, prices have doubled. Most Task 1 charts end in the past, so this is less common.\n- **Future forecasts**: is expected / predicted / projected / forecast to + verb; will + verb; and **future perfect** for 'by' a future date: By 2050, the figure will have doubled.\n\nIf a chart contains both past data and projections (e.g. 2000–2040), switch tense at the present year and signal it: 'This figure is expected to…'.\n\n**Watch out:** rise, fall, grow, increase, decrease are intransitive in Task 1. Do not use them in the passive (not 'was increased'). Learn the irregular forms: rise–rose–risen, fall–fell–fallen, grow–grew–grown. 'Raise' needs an object (The bank raised interest rates).",
    examples: [
      "The line graph shows how many people used the city's three libraries between 2005 and 2020.",
      "Visitor numbers rose steadily from 2005 to 2012 and then fell slightly.",
      "By 2015, the figure had reached 2 million, double its 2005 level.",
      "The proportion of people aged over 65 is projected to reach 25% by 2050.",
      "By 2040, solar power will have overtaken coal as the main energy source.",
      "Since 2000, average house prices in the city have tripled.",
    ],
    commonMistakes: [
      {
        wrong: "The number of tourists was increased in 2010.",
        right: "The number of tourists increased in 2010.",
        why: "'Increase' describing a trend is intransitive, so it has no passive form. Vietnamese 'được tăng' often causes this error.",
      },
      {
        wrong: "In 2015, the figure has risen to 40%.",
        right: "In 2015, the figure rose to 40%.",
        why: "A finished past time (in 2015) requires the past simple, not the present perfect.",
      },
      {
        wrong: "In 2030, the number is expect to rise.",
        right: "By 2030, the number is expected to rise.",
        why: "The structure is 'be expected to + verb'; the -ed ending is needed.",
      },
      {
        wrong: "Sales raised significantly in March.",
        right: "Sales rose significantly in March.",
        why: "'Raise' needs an object; for a trend without an object, use 'rise–rose–risen'.",
      },
    ],
    exercises: [
      {
        prompt: "In 2010, the price of rice ____ (rise) to $500 per tonne.",
        answer: ["rose"],
        explanation: "A finished past date takes the past simple; the past of 'rise' is irregular: 'rose'.",
      },
      {
        prompt: "By 1990, the population ____ (reach) 5 million. (past perfect)",
        answer: ["had reached"],
        explanation: "'By + past date' shows an action completed before that point, so use the past perfect.",
      },
      {
        prompt: "The number of electric cars is predicted ____ (grow) rapidly over the next decade.",
        answer: ["to grow"],
        explanation: "The forecast structure is 'is predicted to + base verb'.",
      },
      {
        prompt: "By 2050, the figure ____ (double). (future perfect)",
        answer: ["will have doubled"],
        explanation: "'By + future date' with a completed result takes the future perfect: will have + past participle.",
      },
      {
        prompt: "Since 2015, online sales in the UK ____ (increase) every year. (The data continue to the present.)",
        answer: ["have increased"],
        explanation: "'Since' with a period that continues to now takes the present perfect; 'sales' is plural, so 'have'.",
      },
      {
        prompt: "Correct the error: Coffee consumption was dropped sharply in 2008. (Write only the corrected verb.)",
        answer: ["dropped"],
        explanation: "'Drop' as a trend verb is intransitive here, so it cannot be passive: 'consumption dropped'.",
      },
      {
        prompt: "The bar chart ____ (compare) the spending habits of three age groups. (present simple)",
        answer: ["compares"],
        explanation: "Use the present simple to describe what the chart shows; 'the bar chart' is singular, so add -s.",
      },
      {
        prompt: "Correct the error: Between 2000 and 2005, unemployment has fallen from 8% to 5%. (Write only the corrected verb.)",
        answer: ["fell"],
        explanation: "The period 2000–2005 is finished, so the past simple 'fell' is required.",
      },
    ],
  },

  /* ------------------------------------------------------------ g06 */
  {
    id: "g06",
    title: "Describing trends: verb phrases and noun phrases",
    targetBand: 6.5,
    explanation:
      "To show range in Task 1, describe the same trend in two ways:\n\n- **Verb + adverb:** House prices **rose sharply**.\n- **Adjective + noun:** There was **a sharp rise** in house prices. / House prices **saw / experienced a sharp rise**.\n\nAlternating these patterns avoids repetition and shows grammatical control. The most common error is mixing the forms: 'a sharply rise' (adverb + noun) or 'rose sharp' (verb + adjective).\n\nUseful pairs: sharp/sharply, steady/steadily, gradual/gradually, significant/significantly, slight/slightly, dramatic/dramatically, considerable/considerably.\n\n**Prepositions carry meaning:**\n- rose **by** 10% = the size of the change\n- rose **to** 50% = the end point\n- rose **from** 20% **to** 50%\n- **a rise in** sales = what increased; **a rise of** 10% = how much\n- **stood at / peaked at** 80%; **reached a peak of** 80%\n\nVerbs for stability are followed by an adjective, not an adverb: remained **stable**, stayed **constant**. You can also use: levelled off, plateaued, fluctuated (between X and Y).\n\nDo not overuse 'dramatically': a change from 20% to 22% is slight, not dramatic. Accurate adverbs also help your Task Achievement score.",
    examples: [
      "Coal consumption fell steadily over the period.",
      "There was a steady fall in coal consumption over the period.",
      "The price of gold rose by 15% to $1,800 per ounce.",
      "The car industry saw a dramatic decline in employment in the 1980s.",
      "Sales fluctuated between 20 and 30 million units before levelling off in 2018.",
      "Unemployment peaked at 12% in 1993.",
    ],
    commonMistakes: [
      {
        wrong: "There was a sharply increase in sales.",
        right: "There was a sharp increase in sales.",
        why: "A noun ('increase') is described by an adjective ('sharp'), not an adverb.",
      },
      {
        wrong: "The number rose dramatical after 2010.",
        right: "The number rose dramatically after 2010.",
        why: "A verb ('rose') is described by an adverb ('dramatically').",
      },
      {
        wrong: "There was an increase of sales in 2019.",
        right: "There was an increase in sales in 2019.",
        why: "'An increase in' shows what increased; 'an increase of' is followed by the amount (an increase of 10%).",
      },
      {
        wrong: "Unemployment remained stably at 5%.",
        right: "Unemployment remained stable at 5%.",
        why: "'Remain' is a linking verb, so it is followed by an adjective.",
      },
      {
        wrong: "The price reached a peak at $90.",
        right: "The price reached a peak of $90.",
        why: "Use 'reached a peak of' or 'peaked at', not a mixture of the two.",
      },
    ],
    exercises: [
      {
        prompt: "Rewrite with a noun phrase: The birth rate declined gradually. → There was a ____ in the birth rate.",
        answer: ["gradual decline", "gradual decrease", "gradual fall", "gradual drop"],
        explanation: "The adverb 'gradually' becomes the adjective 'gradual', and the verb becomes a noun.",
      },
      {
        prompt: "Rewrite with a verb phrase: There was a sharp rise in house prices. → House prices ____.",
        answer: ["rose sharply", "increased sharply", "went up sharply", "climbed sharply", "grew sharply", "sharply rose", "sharply increased"],
        explanation: "The noun 'rise' becomes the past verb 'rose', and the adjective 'sharp' becomes the adverb 'sharply'.",
      },
      {
        prompt: "Sales grew from 5 million ____ 8 million.",
        answer: ["to"],
        explanation: "'From X to Y' gives the starting and end points.",
      },
      {
        prompt: "Profits rose ____ 12%, from $50 million to $56 million.",
        answer: ["by"],
        explanation: "'By' introduces the size of the change (12%), not the end point.",
      },
      {
        prompt: "There was a significant increase ____ the number of cyclists.",
        answer: ["in"],
        explanation: "'An increase in' introduces the thing that increased.",
      },
      {
        prompt: "Correct the error: The temperature dropped dramatical in October. (Write only the corrected word.)",
        answer: ["dramatically"],
        explanation: "The verb 'dropped' needs an adverb.",
      },
      {
        prompt: "Oil prices remained ____ throughout 2016. (stable / stably)",
        answer: ["stable"],
        explanation: "'Remain' is a linking verb followed by an adjective.",
      },
      {
        prompt: "Visitor numbers ____ at 3 million in 2019 and declined afterwards. (One verb meaning 'reached their highest point', past simple.)",
        answer: ["peaked"],
        explanation: "'Peaked at + figure' describes the highest point of a trend.",
      },
    ],
  },

  /* ------------------------------------------------------------ g07 */
  {
    id: "g07",
    title: "Comparatives and superlatives with data",
    targetBand: 6.5,
    explanation:
      "Task 1 always asks you to 'make comparisons where relevant', so accurate comparative structures directly affect two criteria.\n\n**Forms:**\n- one syllable: high – higher – the highest; two+ syllables: popular – more popular – the most popular\n- irregular: good – better – the best; bad – worse – the worst; far – further – the furthest\n- never double them: not 'more higher', not 'the most largest'\n\n**Showing the size of a difference:** much / far / considerably / significantly / slightly / a little + comparative (much higher, slightly lower). Do not use 'very' with comparatives ('very higher' is wrong). For superlatives: **by far** the largest, the **second** highest.\n\n**Multiples:** twice as high as; three times as many visitors as; half as much as.\n\n**Equality:** as… as, the same as, similar to.\n\n**Compare like with like.** Write 'The figure for Japan was higher than **that** for Korea' (that = the figure), or 'than **those** of…' for plurals. 'Japan's figure was higher than Korea' compares a figure with a country.\n\n**Countable vs uncountable:** more/fewer + countable nouns (fewer cars), more/less + uncountable (less traffic); 'as many… as' vs 'as much… as'.\n\nFinally, give numbers to support each comparison: 'considerably higher (45% compared with 30%)'.",
    examples: [
      "Japan spent considerably more on research than Korea did.",
      "The figure for men was almost twice as high as that for women.",
      "Coal was by far the most important source of electricity in 1990.",
      "Fewer students chose history in 2020 than in 2010.",
      "Canada had the second highest rate of internet use, at 88%.",
    ],
    commonMistakes: [
      {
        wrong: "Rice production in Vietnam was more higher than in Thailand.",
        right: "Rice production in Vietnam was much higher than in Thailand.",
        why: "'Higher' is already comparative; use 'much' to show degree, never 'more' + -er.",
      },
      {
        wrong: "The price in 2020 was very higher than in 2010.",
        right: "The price in 2020 was much higher than in 2010.",
        why: "'Very' cannot modify a comparative; use much, far, considerably or significantly.",
      },
      {
        wrong: "The number of cars in Germany was larger than France.",
        right: "The number of cars in Germany was larger than that in France.",
        why: "Compare like with like: a number with a number ('that'), not a number with a country.",
      },
      {
        wrong: "Less people used buses in 2015.",
        right: "Fewer people used buses in 2015.",
        why: "'People' is countable, so use 'fewer' in formal writing.",
      },
      {
        wrong: "Tokyo is the most largest city in the survey.",
        right: "Tokyo is the largest city in the survey.",
        why: "A superlative uses either -est or 'most', never both.",
      },
    ],
    exercises: [
      {
        prompt: "The price of a laptop was much ____ (cheap) in 2020 than in 2005.",
        answer: ["cheaper"],
        explanation: "'Cheap' has one syllable, so the comparative is 'cheaper'; 'much' shows the degree.",
      },
      {
        prompt: "Coffee was the ____ (popular) drink among office workers.",
        answer: ["most popular"],
        explanation: "'Popular' has three syllables, so the superlative is 'the most popular'.",
      },
      {
        prompt: "The unemployment rate in 2010 was ____ (bad) than in any other year.",
        answer: ["worse"],
        explanation: "'Bad' is irregular: bad – worse – the worst.",
      },
      {
        prompt: "Women spent twice as ____ time on housework as men. (much / many)",
        answer: ["much"],
        explanation: "'Time' is uncountable here, so the pattern is 'as much… as'.",
      },
      {
        prompt: "____ students enrolled in 2021 than in 2020. (Less / Fewer)",
        answer: ["fewer"],
        explanation: "'Students' is countable, so use 'fewer'.",
      },
      {
        prompt: "The figure for Germany was higher than ____ for France.",
        answer: ["that"],
        explanation: "'That' replaces 'the figure', so like is compared with like.",
      },
      {
        prompt: "Correct the error: Solar energy was the most cheapest option in 2022. (Write only the corrected phrase.)",
        answer: ["the cheapest", "cheapest", "the cheapest option"],
        explanation: "'Cheap' takes -est; adding 'most' makes a double superlative.",
      },
      {
        prompt: "China was ____ the largest producer, with almost half of global output. (much more / by far / very much)",
        answer: ["by far"],
        explanation: "'By far' intensifies a superlative; 'much more' and 'very much' cannot be used before 'the largest'.",
      },
    ],
  },

  /* ------------------------------------------------------------ g08 */
  {
    id: "g08",
    title: "Relative clauses: defining and non-defining",
    targetBand: 6.5,
    explanation:
      "Relative clauses let you add information inside a sentence, a key feature of the 'complex structures' examiners look for at band 6 and above.\n\n**Defining clauses** tell us which one. They have no commas, can use 'that', and the pronoun can be omitted when it is the object:\n- Students **who/that** work part-time have less time to study.\n- The course (that) I chose was expensive.\n\n**Non-defining clauses** add extra information about something already identified. They need commas, never use 'that', and the pronoun cannot be omitted:\n- Hanoi, **which** is the capital, has over 8 million people.\n\n**Pronouns:** who (people), which (things), whose (possession), where (place = in which), when (time = in which).\n\n**Band 7+ structures:**\n- 'which' referring to a whole clause: Prices rose, **which** reduced demand.\n- preposition + which: the rate **at which**, the extent **to which**, the period **during which**.\n- quantifier + of which/whom: 30 students, **most of whom** were women.\n\n**Typical Vietnamese-learner errors:** repeating the subject (people who **they** live…), forgetting the pronoun (people live in cities cannot…), using 'that' after a comma, and adding a preposition after 'where' (the town where I grew up **in**).",
    examples: [
      "Students who work part-time often have less time for revision.",
      "Hanoi, which is the capital of Vietnam, has a population of over 8 million.",
      "The country whose economy grew fastest was India.",
      "Unemployment rose sharply in 2009, which led to a fall in consumer spending.",
      "The survey questioned 500 workers, most of whom were under 30.",
      "The rate at which cities are expanding is alarming.",
    ],
    commonMistakes: [
      {
        wrong: "People who they live in rural areas have fewer opportunities.",
        right: "People who live in rural areas have fewer opportunities.",
        why: "'Who' is already the subject of the clause; adding 'they' repeats the subject.",
      },
      {
        wrong: "Ho Chi Minh City, that is the largest city in Vietnam, is very dynamic.",
        right: "Ho Chi Minh City, which is the largest city in Vietnam, is very dynamic.",
        why: "'That' cannot introduce a non-defining clause (one with commas).",
      },
      {
        wrong: "This is the town where I grew up in.",
        right: "This is the town where I grew up.",
        why: "'Where' already means 'in which', so the extra 'in' is wrong (alternatively: the town which I grew up in).",
      },
      {
        wrong: "Many people live in big cities cannot afford a house.",
        right: "Many people who live in big cities cannot afford a house.",
        why: "Without 'who', the sentence has two main verbs and no link between them.",
      },
      {
        wrong: "The man which teaches us is from Australia.",
        right: "The man who teaches us is from Australia.",
        why: "Use 'who' (or 'that') for people, 'which' for things.",
      },
    ],
    exercises: [
      {
        prompt: "The country ____ population is the largest is India.",
        answer: ["whose"],
        explanation: "'Whose' shows possession: the country's population.",
      },
      {
        prompt: "Tokyo, ____ hosted the Olympics in 2021, is a very expensive city.",
        answer: ["which"],
        explanation: "This is a non-defining clause (with commas) about a thing, so 'which', not 'that'.",
      },
      {
        prompt: "Children ____ grow up bilingual often find it easier to learn a third language.",
        answer: ["who", "that"],
        explanation: "A defining clause about people can use 'who' or 'that'.",
      },
      {
        prompt: "2008 was the year ____ the global financial crisis began.",
        answer: ["when", "in which", "that"],
        explanation: "'When' (or 'in which') introduces a clause about a time.",
      },
      {
        prompt: "House prices doubled, ____ made it difficult for young people to buy homes.",
        answer: ["which"],
        explanation: "'Which' after a comma can refer to the whole previous clause.",
      },
      {
        prompt: "Correct the error: Tourists who they visit Hoi An often stay for several days. (Write only the word that should be removed.)",
        answer: ["they"],
        explanation: "'Who' is the subject of the relative clause, so 'they' is a repeated subject.",
      },
      {
        prompt: "The speed at ____ technology is changing surprises many people.",
        answer: ["which"],
        explanation: "After a preposition, use 'which' for things ('that' cannot follow a preposition).",
      },
      {
        prompt: "Correct the error: My teacher, that has worked in Japan, speaks four languages. (Write only the corrected word.)",
        answer: ["who"],
        explanation: "A non-defining clause about a person needs 'who'; 'that' is not used after a comma.",
      },
    ],
  },

  /* ------------------------------------------------------------ g09 */
  {
    id: "g09",
    title: "The passive voice",
    targetBand: 6.5,
    explanation:
      "The passive is formed with **be + past participle**. It focuses on the action or result rather than the person who does it, which suits academic writing.\n\n**Where to use it in IELTS:**\n- **Task 1 processes:** present simple passive with sequencers: First, the beans are harvested. They are then dried in the sun.\n- **Task 1 maps:** past or present perfect passive: A car park was built. The trees have been cut down.\n- **Task 2:** formal, objective statements and recommendations: More funding should be given to hospitals. It is widely believed that…\n\n**Tense forms:** is made, was made, has been made, is being made, will be made, can/should be made.\n\n**Impersonal passive** for reporting opinions: It is thought / believed / argued that… or X is thought to be…\n\n**Two key rules:**\n- Only verbs with an object can be passive. Happen, occur, rise, fall, appear, arrive and die have no passive form. Vietnamese 'bị/được' leads to errors such as 'The accident was happened'.\n- Never omit 'be': 'The leaves are picked', not 'The leaves picked'.\n\nAdd 'by + agent' only when the doer is important (The bridge was designed by a Japanese firm). Do not make every sentence passive: a mix of active and passive reads more naturally.",
    examples: [
      "First, the tea leaves are picked by hand, and then they are dried in the sun.",
      "The old factory was demolished and replaced with a shopping centre.",
      "A new bridge has been built across the river.",
      "It is widely believed that social media affects teenagers' self-esteem.",
      "Plastic bottles can be recycled into clothing.",
      "More funding should be given to public hospitals.",
    ],
    commonMistakes: [
      {
        wrong: "The accident was happened at night.",
        right: "The accident happened at night.",
        why: "'Happen' is intransitive, so it cannot be passive.",
      },
      {
        wrong: "Next, the clay mixed with water.",
        right: "Next, the clay is mixed with water.",
        why: "The clay does not mix itself; the passive needs 'be' + past participle.",
      },
      {
        wrong: "Many trees were cutted down.",
        right: "Many trees were cut down.",
        why: "'Cut' is irregular: cut – cut – cut.",
      },
      {
        wrong: "A new school was build in 2010.",
        right: "A new school was built in 2010.",
        why: "The passive uses the past participle ('built'), not the base form.",
      },
      {
        wrong: "The number of students was risen in 2018.",
        right: "The number of students rose in 2018.",
        why: "'Rise' has no object and cannot be passive.",
      },
    ],
    exercises: [
      {
        prompt: "In the next stage, the bottles ____ (wash) in hot water. (present simple passive)",
        answer: ["are washed"],
        explanation: "Process description: 'are' (plural subject) + past participle 'washed'.",
      },
      {
        prompt: "The old hospital ____ (convert) into a hotel in 2015.",
        answer: ["was converted"],
        explanation: "A finished past date with a passive meaning: was + past participle.",
      },
      {
        prompt: "Since 2010, three new parks ____ (create) in the city centre.",
        answer: ["have been created"],
        explanation: "'Since' takes the present perfect; the passive form is have been + past participle.",
      },
      {
        prompt: "It ____ (believe) that regular exercise improves memory. (present simple)",
        answer: ["is believed", "is widely believed"],
        explanation: "The impersonal passive 'It is believed that…' reports a general opinion.",
      },
      {
        prompt: "Correct the error: The fire was occurred in the early morning. (Write only the corrected verb.)",
        answer: ["occurred"],
        explanation: "'Occur' is intransitive and has no passive form.",
      },
      {
        prompt: "In the future, more goods ____ (deliver) by drones. (will + passive)",
        answer: ["will be delivered"],
        explanation: "Future passive: will be + past participle.",
      },
      {
        prompt: "A new metro line ____ (build) at the moment. (present continuous passive)",
        answer: ["is being built"],
        explanation: "Present continuous passive: is being + past participle; 'build' is irregular (built).",
      },
      {
        prompt: "Correct the error: After that, the fruit sent to supermarkets. (Write the corrected sentence.)",
        answer: ["after that, the fruit is sent to supermarkets.", "after that, the fruit is sent to supermarkets", "after that the fruit is sent to supermarkets."],
        explanation: "The fruit does not send itself, so the passive with 'is' is required.",
      },
    ],
  },

  /* ------------------------------------------------------------ g10 */
  {
    id: "g10",
    title: "Conditionals, including mixed conditionals",
    targetBand: 7,
    explanation:
      "Conditionals are ideal for Task 2 because they let you discuss causes, consequences and solutions.\n\n- **Zero** (general truth): If + present, present. If water is heated to 100°C, it boils.\n- **First** (real future): If + present, will + verb. If fuel taxes rise, people will drive less.\n- **Second** (unreal present / unlikely future): If + past, would + verb. If cities had more cycle lanes, fewer people would drive.\n- **Third** (unreal past): If + past perfect, would have + past participle. If the factory had installed filters, the river would not have been polluted.\n\n**Mixed conditionals** (band 7+):\n- past condition → present result: If the city **had built** a metro in the 1990s, traffic **would not be** so bad now.\n- present condition → past result: If people **were** more aware of the risks, they **would not have voted** for the plan.\n\n**Alternatives to 'if':** unless (= if… not), provided / providing (that), as long as, otherwise, and inverted forms such as 'Were the government to…' (see the inversion lesson).\n\n**Common errors:**\n- 'will' or 'would' in the if-clause: not 'If the government will reduce taxes…'\n- 'unless' + negative: 'Unless people don't…' is a double negative.\n- In formal writing, use 'If I were' rather than 'If I was'.",
    examples: [
      "If governments raise taxes on fuel, people will drive less.",
      "If cities had more cycle lanes, fewer people would commute by car.",
      "If the factory had installed filters, the river would not have been polluted.",
      "If the city had built a metro system twenty years ago, it would not suffer from such severe congestion today.",
      "Unless young people receive proper training, they will struggle to find skilled jobs.",
      "Students can work part-time provided that it does not affect their studies.",
    ],
    commonMistakes: [
      {
        wrong: "If the government will reduce taxes, people will spend more.",
        right: "If the government reduces taxes, people will spend more.",
        why: "In first conditionals the if-clause uses the present simple, not 'will'.",
      },
      {
        wrong: "If I would have studied harder, I would pass the exam.",
        right: "If I had studied harder, I would have passed the exam.",
        why: "The third conditional uses the past perfect in the if-clause and 'would have + past participle' in the result.",
      },
      {
        wrong: "Unless people don't change their habits, pollution will get worse.",
        right: "Unless people change their habits, pollution will get worse.",
        why: "'Unless' already means 'if not', so another negative reverses the meaning.",
      },
      {
        wrong: "If I am the president, I would ban plastic bags.",
        right: "If I were the president, I would ban plastic bags.",
        why: "An unreal situation takes the second conditional: if + past ('were'), would + verb.",
      },
    ],
    exercises: [
      {
        prompt: "If more people ____ (cycle) to work, air quality will improve.",
        answer: ["cycle"],
        explanation: "First conditional: present simple in the if-clause, 'will' in the result.",
      },
      {
        prompt: "If I ____ (be) the Minister of Education, I would reduce class sizes.",
        answer: ["were", "was"],
        explanation: "Second conditional (unreal present). 'Were' is preferred in formal writing; 'was' is acceptable in informal English.",
      },
      {
        prompt: "If the company had listened to its customers, it ____ (not / lose) so much money last year.",
        answer: ["would not have lost", "wouldn't have lost"],
        explanation: "Third conditional (unreal past): would not have + past participle.",
      },
      {
        prompt: "If the government had invested in renewable energy in the 2000s, electricity ____ (be) cheaper today.",
        answer: ["would be"],
        explanation: "Mixed conditional: a past condition with a present result ('today'), so 'would + verb'.",
      },
      {
        prompt: "____ students attend regularly, they will not pass the course. (If / Unless)",
        answer: ["unless"],
        explanation: "The meaning is 'if they do not attend', which is 'unless'.",
      },
      {
        prompt: "Correct the error: If tuition fees will rise, fewer students will go to university. (Write only the corrected verb.)",
        answer: ["rise"],
        explanation: "No 'will' in the if-clause of a first conditional: 'If tuition fees rise'.",
      },
      {
        prompt: "If water ____ (heat) to 100°C, it boils. (zero conditional, passive)",
        answer: ["is heated"],
        explanation: "Zero conditional for a scientific fact: present simple in both clauses; water does not heat itself, so passive.",
      },
      {
        prompt: "Correct the error: Unless the city doesn't build more housing, rents will keep rising. (Write the corrected sentence.)",
        answer: [
          "unless the city builds more housing, rents will keep rising.",
          "unless the city builds more housing, rents will keep rising",
          "if the city doesn't build more housing, rents will keep rising.",
          "if the city does not build more housing, rents will keep rising.",
        ],
        explanation: "'Unless' already contains the negative, so use a positive verb (builds), or use 'if… doesn't'.",
      },
    ],
  },

  /* ------------------------------------------------------------ g11 */
  {
    id: "g11",
    title: "Complex sentences with subordinators",
    targetBand: 7,
    explanation:
      "Band 6 requires 'a mix of simple and complex sentence forms'; band 7 requires 'a variety of complex structures'. Subordinators are the fastest way to build them.\n\n- **Contrast:** although, even though, while, whereas\n- **Condition:** if, unless, provided that, as long as\n- **Reason:** because, since, as\n- **Purpose:** so that\n- **Time:** when, once, until, as soon as, before, after\n- **Result:** so + adjective + that, such + noun + that\n\n**Rules:**\n- **One linker per relationship.** Vietnamese pairs 'tuy… nhưng' and 'vì… nên', which leads to 'Although…, but…' and 'Because…, so…'. In English, use only one: 'Although it is expensive, it is popular.'\n- **A subordinate clause cannot stand alone.** 'Because it is convenient.' is a fragment; join it to a main clause.\n- **Comma:** use one when the subordinate clause comes first (Although X, Y). 'Whereas' and 'while' are usually preceded by a comma.\n- **Despite / in spite of** are prepositions: follow them with a noun or -ing form (despite the rain, despite rising prices), or 'despite the fact that' + clause. Never 'despite it was…'.\n- **Even though** is two words; 'even' alone is not a conjunction.\n\n'Whereas' and 'while' are especially useful in Task 1 for contrasting two sets of data in one sentence.",
    examples: [
      "Although online courses are cheaper, many students prefer face-to-face classes.",
      "Men spent more time on sport, whereas women spent more time on housework.",
      "Despite rising fuel prices, car ownership continued to grow.",
      "Unless public transport becomes more reliable, people will continue to drive.",
      "Many families move to the suburbs so that their children can have more space.",
      "Once the clay has dried, it is fired in a kiln.",
    ],
    commonMistakes: [
      {
        wrong: "Although technology is useful, but it can be harmful.",
        right: "Although technology is useful, it can be harmful.",
        why: "Use one contrast linker only; this error comes from Vietnamese 'tuy… nhưng'.",
      },
      {
        wrong: "Because the city is crowded, so many people move out.",
        right: "Because the city is crowded, many people move out.",
        why: "Use one linker only; this error comes from Vietnamese 'vì… nên'.",
      },
      {
        wrong: "Despite it was raining, the match continued.",
        right: "Although it was raining, the match continued.",
        why: "'Despite' must be followed by a noun or -ing form (despite the rain), not a clause.",
      },
      {
        wrong: "Many people use the internet. Because it is convenient.",
        right: "Many people use the internet because it is convenient.",
        why: "A 'because' clause on its own is a sentence fragment.",
      },
      {
        wrong: "Even the price is high, people still buy it.",
        right: "Even though the price is high, people still buy it.",
        why: "'Even' alone cannot join clauses; the conjunction is 'even though'.",
      },
    ],
    exercises: [
      {
        prompt: "____ the cost of living is high, many young people still move to the capital. (Although / Despite / However)",
        answer: ["although", "even though", "though"],
        explanation: "A full clause follows, so a subordinator is needed; 'despite' needs a noun and 'however' cannot join clauses.",
      },
      {
        prompt: "____ the heavy traffic, we arrived on time. (Although / Despite / Unless)",
        answer: ["despite", "in spite of"],
        explanation: "'The heavy traffic' is a noun phrase, so a preposition ('despite') is needed, not a conjunction.",
      },
      {
        prompt: "In 2020, Japan mainly exported cars, ____ Vietnam mainly exported textiles. (whereas / despite / unless)",
        answer: ["whereas", "while"],
        explanation: "'Whereas' contrasts two facts of equal weight, which is typical in Task 1.",
      },
      {
        prompt: "Correct the error: Although the course was expensive, but it was worth it. (Write only the word that should be removed.)",
        answer: ["but"],
        explanation: "'Although' and 'but' express the same contrast; English uses only one.",
      },
      {
        prompt: "Many parents limit screen time ____ that their children get enough sleep.",
        answer: ["so"],
        explanation: "'So that' introduces a purpose clause.",
      },
      {
        prompt: "Correct the error: Despite the government spent more on roads, congestion got worse. (Write only the word or phrase that should replace 'Despite'.)",
        answer: ["although", "even though", "though", "despite the fact that", "in spite of the fact that"],
        explanation: "A full clause (the government spent…) follows, so use 'although' or 'despite the fact that'.",
      },
      {
        prompt: "Patients can go home ____ their test results are normal. (as long as / unless / whereas)",
        answer: ["as long as"],
        explanation: "'As long as' means 'on condition that', which matches the meaning; 'unless' would reverse it.",
      },
      {
        prompt: "Correct the error: Because the rent was too high, so we moved to a smaller flat. (Write only the word that should be removed.)",
        answer: ["so"],
        explanation: "'Because' and 'so' express the same cause–effect link; use only one.",
      },
    ],
  },

  /* ------------------------------------------------------------ g12 */
  {
    id: "g12",
    title: "Noun phrases and nominalisation",
    targetBand: 7,
    explanation:
      "Academic English packs information into **nouns**. Turning verbs and adjectives into nouns (nominalisation) makes writing more formal, more concise and easier to link.\n\n- increase → an increase; develop → development; reduce → a reduction\n- fail → failure; decide → decision; introduce → introduction\n- available → availability; important → importance; aware → awareness; able → ability\n\nCompare:\n- Basic: Because people use cars more, the air becomes more polluted.\n- Nominalised: **Increased car use** leads to **higher levels of air pollution**.\n\n**Expanding noun phrases.** Add information before and after the head noun:\n- before: the **rapid economic** growth\n- after: the rapid growth **of online shopping in Asia**; the decision **to raise fees**; people **living in rural areas**\n\nNominalisation also helps cohesion: end one sentence with an idea and start the next with a noun that sums it up: 'Prices rose by 40%. **This increase** forced many families to…'\n\n**Accuracy points:**\n- Use the correct word form: 'the development of', not 'the develop of'.\n- Nominalised verbs are usually followed by a preposition: a reduction **in**, the importance **of**, a decision **to**.\n- Do not overload: three or four nouns in a row ('city centre car park fee increase policy') is hard to read. Clear, accurate noun phrases score better than long ones.",
    examples: [
      "The rapid expansion of cities has led to a shortage of affordable housing.",
      "The introduction of a sugar tax resulted in a 10% reduction in soft drink sales.",
      "Increased access to the internet has transformed education.",
      "The government's failure to regulate the industry caused widespread pollution.",
      "There is growing concern about the impact of social media on children.",
    ],
    commonMistakes: [
      {
        wrong: "The develop of technology has changed our lives.",
        right: "The development of technology has changed our lives.",
        why: "After 'the' and before 'of', a noun is needed, not a verb.",
      },
      {
        wrong: "Many people know the important of English.",
        right: "Many people know the importance of English.",
        why: "'Important' is an adjective; the noun form is 'importance'.",
      },
      {
        wrong: "The government's decide to raise fees angered students.",
        right: "The government's decision to raise fees angered students.",
        why: "A possessive ('the government's') must be followed by a noun.",
      },
      {
        wrong: "The available of jobs in rural areas is limited.",
        right: "The availability of jobs in rural areas is limited.",
        why: "The noun form of 'available' is 'availability'.",
      },
    ],
    exercises: [
      {
        prompt: "The ____ (introduce) of free school meals improved attendance.",
        answer: ["introduction"],
        explanation: "After 'the' and before 'of', the noun form is needed: introduction.",
      },
      {
        prompt: "There was a sharp ____ (reduce) in carbon emissions after 2015.",
        answer: ["reduction"],
        explanation: "'A sharp' + noun; the noun of 'reduce' is 'reduction', followed by 'in'.",
      },
      {
        prompt: "The ____ (available) of cheap flights has encouraged more people to travel.",
        answer: ["availability"],
        explanation: "The noun form of 'available' is 'availability'.",
      },
      {
        prompt: "Many experts have stressed the ____ (important) of early education.",
        answer: ["importance"],
        explanation: "'The ____ of' requires a noun: importance.",
      },
      {
        prompt: "The ____ (fail) of the project was due to poor planning.",
        answer: ["failure"],
        explanation: "The noun of 'fail' is 'failure'.",
      },
      {
        prompt: "Rewrite with a noun: Cities have grown rapidly, and this has caused traffic problems. → The rapid ____ of cities has caused traffic problems.",
        answer: ["growth", "expansion"],
        explanation: "The verb 'grow' becomes the noun 'growth'; the adverb 'rapidly' becomes the adjective 'rapid'.",
      },
      {
        prompt: "Correct the error: The govern's decision surprised many economists. (Write only the corrected word.)",
        answer: ["government's"],
        explanation: "'Govern' is a verb; the noun with a possessive is 'government's'.",
      },
      {
        prompt: "Nominalise: People are more aware of climate change than before. → There is greater ____ of climate change than before.",
        answer: ["awareness"],
        explanation: "The adjective 'aware' becomes the noun 'awareness'.",
      },
    ],
  },

  /* ------------------------------------------------------------ g13 */
  {
    id: "g13",
    title: "Participle clauses",
    targetBand: 7.5,
    explanation:
      "Participle clauses are reduced clauses that make writing concise and sophisticated. They are a clear sign of band 7+ range when used accurately.\n\n**Three forms:**\n- **-ing** (active meaning): People **living** in rural areas… (= who live)\n- **past participle** (passive meaning): Goods **made** in Vietnam… (= which are made)\n- **having + past participle** (an earlier action): **Having finished** the course, students receive a certificate.\n\n**Uses:**\n- replacing relative clauses: students **studying** abroad; houses **built** before 1950\n- **result** in Task 1: Sales rose by 20%, **reaching** a peak of 8 million. Coal accounted for 40%, **making** it the largest source.\n- **time / sequence** in processes: **Once dried**, the bricks are fired. **After being washed**, the bottles are crushed.\n- **reason**: **Faced with** rising costs, many firms closed.\n\n**Two accuracy rules:**\n- **Active or passive?** Ask whether the noun does the action. Students live (living); goods are produced (produced), not 'goods producing'.\n- **Same subject.** The understood subject of the participle must be the subject of the main clause. 'Walking to school, the rain started' suggests the rain was walking (a 'dangling' participle).\n\nAfter the comma in Task 1, use the -ing form, not a past tense verb: 'rose steadily, reaching', not 'rose steadily, reached'.",
    examples: [
      "Sales rose steadily, reaching a peak of 8 million in 2018.",
      "Coal accounted for 40% of electricity, making it the largest source.",
      "Products made from recycled plastic are becoming more popular.",
      "Having been cut, the wood is transported to a factory.",
      "People living in rural areas often have limited access to healthcare.",
      "Faced with rising costs, many small businesses closed.",
    ],
    commonMistakes: [
      {
        wrong: "Sales rose steadily, reached a peak in 2018.",
        right: "Sales rose steadily, reaching a peak in 2018.",
        why: "Two finite verbs joined by a comma create a comma splice; the second must be a participle (or use 'and reached').",
      },
      {
        wrong: "Goods producing in Vietnam are exported to Europe.",
        right: "Goods produced in Vietnam are exported to Europe.",
        why: "Goods do not produce; they are produced, so the passive participle is needed.",
      },
      {
        wrong: "Walking to school, the rain started.",
        right: "As I was walking to school, it started to rain.",
        why: "The participle's subject must match the main clause subject; the rain was not walking.",
      },
      {
        wrong: "Having finish the course, students receive a certificate.",
        right: "Having finished the course, students receive a certificate.",
        why: "The perfect participle is 'having + past participle'.",
      },
    ],
    exercises: [
      {
        prompt: "The figure for Spain fell sharply, ____ (drop) to just 5% in 2020.",
        answer: ["dropping"],
        explanation: "After the comma, an -ing participle adds the result of the fall.",
      },
      {
        prompt: "Most of the electronics ____ (sell) in Europe are made in Asia.",
        answer: ["sold"],
        explanation: "Electronics are sold (passive meaning), so use the past participle.",
      },
      {
        prompt: "Students ____ (live) on campus spend less on transport.",
        answer: ["living"],
        explanation: "Students live (active meaning): 'living' = 'who live'.",
      },
      {
        prompt: "____ (complete) the survey, participants received a small reward. (perfect participle)",
        answer: ["having completed"],
        explanation: "'Having + past participle' shows that completing came before receiving.",
      },
      {
        prompt: "Oil accounted for 45% of the total, ____ (make) it the main fuel.",
        answer: ["making"],
        explanation: "The -ing clause expresses the result of the previous clause.",
      },
      {
        prompt: "Correct the error: Houses building before 1950 are often poorly insulated. (Write only the corrected word.)",
        answer: ["built"],
        explanation: "Houses are built (passive meaning), so use the past participle 'built'.",
      },
      {
        prompt: "Once ____ (pack), the products are sent to retailers.",
        answer: ["packed"],
        explanation: "'Once (they are) packed' – the products are packed, so a past participle is needed.",
      },
      {
        prompt: "Correct the error: Having finish their exams, the students went on holiday. (Write only the corrected word.)",
        answer: ["finished"],
        explanation: "The perfect participle needs the past participle: having finished.",
      },
    ],
  },

  /* ------------------------------------------------------------ g14 */
  {
    id: "g14",
    title: "Modal verbs and hedging",
    targetBand: 7,
    explanation:
      "Strong writers avoid overgeneralisation. A sentence such as 'All young people are addicted to their phones' is easy to disagree with and sounds unacademic. **Hedging** makes claims precise and defensible, which supports both Task Response and Grammatical Range.\n\n**Tools for hedging:**\n- **Modals:** may, might, could (possibility); would (hypothetical); should (recommendation)\n- **Verbs:** tend to, appear to, seem to, suggest\n- **Adjectives / adverbs:** likely, possible, probably, arguably, generally\n- **Quantifiers:** many, most, some, a significant proportion of\n- **Impersonal phrases:** It could be argued that…, It is widely believed that…\n\n**Scale of certainty:** will → is likely to → may → might / could.\n\n**Grammar rules:**\n- Modal + **base verb**: may cause (not 'may causes', not 'may to cause').\n- Past possibility: may / might / could **have + past participle**: The fall might have been caused by the new tax.\n- 'May be' (verb) vs 'maybe' (adverb, informal). In essays, write 'This may be the reason', not 'Maybe this is the reason'.\n- 'Likely' is an adjective: 'is likely to rise'; 'probably' is an adverb: 'will probably rise'.\n\n**Do not over-hedge.** 'It might possibly perhaps be true' sounds weak. Use one hedge per claim, and state your main position clearly.",
    examples: [
      "Long working hours may lead to serious health problems.",
      "It could be argued that university education should be free.",
      "Children who spend hours online tend to be less physically active.",
      "The decline in sales might have been caused by the new tax.",
      "This policy is likely to reduce traffic in the city centre.",
      "Governments should provide incentives for electric vehicles.",
    ],
    commonMistakes: [
      {
        wrong: "Social media can makes people lonely.",
        right: "Social media can make people lonely.",
        why: "A modal verb is always followed by the base form, with no -s.",
      },
      {
        wrong: "This maybe the main reason for the decline.",
        right: "This may be the main reason for the decline.",
        why: "'Maybe' is an adverb; the sentence needs the modal 'may' + the verb 'be'.",
      },
      {
        wrong: "The fall in sales might caused by the new tax.",
        right: "The fall in sales might have been caused by the new tax.",
        why: "Past possibility in the passive needs 'might have been + past participle'.",
      },
      {
        wrong: "Technology must destroy traditional culture.",
        right: "Technology may threaten some aspects of traditional culture.",
        why: "'Must' sounds too certain and overgeneralised; hedging makes the claim defensible.",
      },
    ],
    exercises: [
      {
        prompt: "Too much screen time ____ affect children's sleep. (may / maybe)",
        answer: ["may"],
        explanation: "A modal verb is needed before 'affect'; 'maybe' is an adverb.",
      },
      {
        prompt: "Social media might ____ (cause) loneliness among teenagers.",
        answer: ["cause"],
        explanation: "After a modal, use the base form without 'to' or -s.",
      },
      {
        prompt: "The drop in visitor numbers ____ been caused by the pandemic. (possibility in the past – two words)",
        answer: ["may have", "might have", "could have"],
        explanation: "Past possibility: may/might/could + have + past participle.",
      },
      {
        prompt: "Young people ____ to spend more time online than older people. (one verb meaning 'usually do')",
        answer: ["tend"],
        explanation: "'Tend to + verb' hedges a generalisation; the subject is plural, so no -s.",
      },
      {
        prompt: "It could be ____ (argue) that tourism does more harm than good.",
        answer: ["argued"],
        explanation: "The impersonal passive 'It could be argued that…' presents a view without overclaiming.",
      },
      {
        prompt: "Correct the error: Banning cars may to reduce pollution. (Write only the corrected phrase.)",
        answer: ["may reduce"],
        explanation: "Modals are followed by the bare infinitive, without 'to'.",
      },
      {
        prompt: "Correct the error: This maybe the most effective solution. (Write only the corrected phrase.)",
        answer: ["may be"],
        explanation: "The sentence needs a verb: modal 'may' + 'be'.",
      },
      {
        prompt: "The new tax is ____ to reduce sugar consumption. (likely / probably)",
        answer: ["likely"],
        explanation: "'Be likely to + verb' uses the adjective 'likely'; 'probably' is an adverb and cannot follow 'is' with 'to'.",
      },
    ],
  },

  /* ------------------------------------------------------------ g15 */
  {
    id: "g15",
    title: "Cleft sentences and emphasis",
    targetBand: 7.5,
    explanation:
      "Cleft sentences split one idea into two clauses to **emphasise** the most important part. Used once or twice in an essay, they show flexible control of grammar.\n\n**It-cleft:** It is / was + focus + that / who + rest of the sentence.\n- The cost of housing drives young people away. → **It is** the cost of housing **that** drives young people away.\n- **It was not until** 2010 **that** smartphones became affordable.\n\n**What-cleft:** What + clause + is / was + focus.\n- **What** many employers value most **is** teamwork.\n- **What** the government should do **is** invest in training. (base verb after 'is' when the clause contains 'do')\n\n**Other emphatic structures:**\n- **The reason why… is that…**: The reason why fees rose is that funding was cut. (not 'is because' – that repeats the idea of reason)\n- **Emphatic do**: Online learning **does** offer flexibility, but… (do/does/did + base verb, useful for conceding a point)\n- **All (that)… is…**: All that is needed is political will.\n\n**Accuracy points:**\n- The verb after the focus agrees with the focus: It is the teachers who **have**…\n- Do not add an extra subject: 'What students need is…', not 'What students need it is…'.\n- Avoid empty fillers like 'What I want to say is that…' – emphasise ideas, not your own speech.",
    examples: [
      "It is the cost of housing, not salaries, that drives young people out of the city.",
      "What many employers value most is the ability to work in a team.",
      "It was not until 2010 that smartphones became affordable for most families.",
      "The reason why many students study abroad is that foreign degrees are highly valued.",
      "Online learning does offer flexibility, but it requires strong self-discipline.",
      "What the government should do is invest more in vocational training.",
    ],
    commonMistakes: [
      {
        wrong: "The reason why people move to cities is because they want jobs.",
        right: "The reason why people move to cities is that they want jobs.",
        why: "'The reason… is because' repeats the idea of cause; use 'is that'.",
      },
      {
        wrong: "What students need it is more practice.",
        right: "What students need is more practice.",
        why: "The what-clause is already the subject, so 'it' is an extra subject (a common transfer error).",
      },
      {
        wrong: "Technology does helps us communicate.",
        right: "Technology does help us communicate.",
        why: "Emphatic 'does' is followed by the base verb, without -s.",
      },
      {
        wrong: "It was not until 1990 the law was passed.",
        right: "It was not until 1990 that the law was passed.",
        why: "The it-cleft needs 'that' to introduce the second clause.",
      },
    ],
    exercises: [
      {
        prompt: "It is the lack of affordable housing ____ worries young people most.",
        answer: ["that", "which"],
        explanation: "The it-cleft pattern is 'It is + focus + that…'; 'which' is also possible when the focus is a thing.",
      },
      {
        prompt: "____ many tourists enjoy most is the local food.",
        answer: ["what"],
        explanation: "A what-cleft: 'What + clause + is + focus'.",
      },
      {
        prompt: "The reason why fees rose is ____ the government cut university funding.",
        answer: ["that"],
        explanation: "'The reason why… is that…' – not 'is because'.",
      },
      {
        prompt: "It was not ____ 1969 that humans first landed on the Moon.",
        answer: ["until"],
        explanation: "'It was not until + time + that…' emphasises how late something happened.",
      },
      {
        prompt: "Social media ____ have some benefits, but they are often exaggerated. (emphatic do, present)",
        answer: ["does", "do"],
        explanation: "Emphatic 'does' + base verb concedes a point strongly; 'social media' usually takes a singular verb, though 'do' (treating 'media' as plural) is also accepted.",
      },
      {
        prompt: "Correct the error: The reason why sales fell is because prices rose. (Write only the corrected word.)",
        answer: ["that"],
        explanation: "'The reason… is because' is redundant; use 'is that'.",
      },
      {
        prompt: "What the city needs ____ a better public transport system. (be, present)",
        answer: ["is"],
        explanation: "A what-clause subject takes a singular verb.",
      },
      {
        prompt: "Correct the error: Technology does makes life easier. (Write only the corrected word.)",
        answer: ["make"],
        explanation: "After emphatic 'does', use the base form 'make'.",
      },
    ],
  },

  /* ------------------------------------------------------------ g16 */
  {
    id: "g16",
    title: "Inversion for emphasis",
    targetBand: 8,
    explanation:
      "Inversion means putting an **auxiliary verb before the subject**, as in a question, after a negative or restrictive expression at the start of a sentence. It is formal and emphatic, and accurate use signals the 'wide range of structures' of band 8. One well-placed example per essay is enough; an inaccurate one costs more than it gains.\n\n**Negative / restrictive openers:**\n- **Not only** does pollution damage health, **but** it **also** reduces productivity.\n- **Rarely / Seldom / Never** have prices risen so fast.\n- **Only by / Only when / Only if**… can cities reduce congestion. (inversion is in the **main** clause)\n- **Not until** 2010 did the policy change.\n- **No sooner** had the law been passed **than** protests began.\n- **Under no circumstances** should children be left alone.\n\n**Conditional inversion** (drop 'if'):\n- **Had** the government acted earlier (= If the government had acted)…\n- **Were** the government to ban cars (= If the government were to ban)…\n- **Should** the trend continue (= If the trend continues)…\n\n**How to form it:** use the existing auxiliary (have, can, will, is). If there is none, add **do / does / did** and use the base verb: Rarely **do** people **travel**…\n\n**Common errors:** forgetting to invert (Never I have seen), inverting in the wrong clause after 'Only when', and keeping 'if' with conditional inversion.",
    examples: [
      "Not only does air pollution damage health, but it also reduces productivity.",
      "Rarely have house prices risen so quickly.",
      "Only by investing in public transport can cities reduce congestion.",
      "Had the factory been closed earlier, the river would have recovered faster.",
      "Should the trend continue, coal will disappear from the energy mix by 2040.",
      "No sooner had the policy been introduced than complaints began.",
    ],
    commonMistakes: [
      {
        wrong: "Not only it saves time, but it also saves money.",
        right: "Not only does it save time, but it also saves money.",
        why: "'Not only' at the start requires an auxiliary before the subject; with no auxiliary, add 'does' + base verb.",
      },
      {
        wrong: "Only when people pay more they will value water.",
        right: "Only when people pay more will they value water.",
        why: "After an 'Only when' clause, the inversion goes in the main clause.",
      },
      {
        wrong: "Never I have seen such rapid change.",
        right: "Never have I seen such rapid change.",
        why: "A negative adverb at the start triggers auxiliary–subject inversion.",
      },
      {
        wrong: "If had the government acted earlier, the crisis would have been avoided.",
        right: "Had the government acted earlier, the crisis would have been avoided.",
        why: "Conditional inversion replaces 'if'; you cannot use both.",
      },
      {
        wrong: "Rarely people travel by train in this region.",
        right: "Rarely do people travel by train in this region.",
        why: "With no auxiliary in the original sentence, insert 'do/does/did' after 'Rarely'.",
      },
    ],
    exercises: [
      {
        prompt: "Not only ____ the scheme reduce costs, but it also improves safety.",
        answer: ["does"],
        explanation: "Present simple with no auxiliary, so add 'does' + base verb ('reduce').",
      },
      {
        prompt: "Rarely ____ such a dramatic fall in prices been recorded.",
        answer: ["has"],
        explanation: "The verb is present perfect passive ('has been recorded'), so the auxiliary 'has' moves before the subject.",
      },
      {
        prompt: "Only by working together ____ countries solve climate change. (modal of ability)",
        answer: ["can"],
        explanation: "'Only by…' triggers inversion in the main clause: can + subject + base verb.",
      },
      {
        prompt: "____ the government acted sooner, the crisis could have been avoided. (= If the government had acted sooner)",
        answer: ["had"],
        explanation: "Third conditional inversion: 'Had + subject + past participle' replaces 'If… had'.",
      },
      {
        prompt: "No sooner had the shop opened ____ a long queue formed.",
        answer: ["than"],
        explanation: "The fixed pattern is 'No sooner had… than…'.",
      },
      {
        prompt: "Correct the error: Only when prices fall people will buy more electric cars. (Write only the corrected words after 'fall'.)",
        answer: ["will people buy", "will people buy more electric cars", "will people buy more electric cars."],
        explanation: "After the 'Only when' clause, the main clause is inverted: will + people + buy.",
      },
      {
        prompt: "____ the trend continue, the figure will reach 50% by 2040. (= If the trend continues)",
        answer: ["should"],
        explanation: "'Should + subject + base verb' is a formal inverted first conditional.",
      },
      {
        prompt: "Correct the error: Never I have seen such a beautiful beach. (Write only the first four words, corrected.)",
        answer: ["never have i seen"],
        explanation: "After 'Never' at the start, invert the auxiliary and subject: Never have I seen.",
      },
    ],
  },
];
