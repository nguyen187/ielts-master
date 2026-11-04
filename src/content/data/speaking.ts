import type { SpeakingPart1Topic, CueCard } from '../types';

/* ------------------------------------------------------------------ */
/* Speaking Part 1 — 24 everyday topics                                */
/* ------------------------------------------------------------------ */

export const speakingPart1: SpeakingPart1Topic[] = [
  {
    id: 's1-01',
    topic: 'Work or study',
    questions: [
      "Do you work or are you a student?",
      "Why did you choose that job or subject?",
      "What do you like most about your work or studies?",
      "Is there anything you find difficult about it?",
      "Would you like to change your job or subject in the future?",
    ],
    sample:
      "I'm actually a full-time student at the moment. I'm in my third year of a business degree, which I picked mainly because I've always been fascinated by how small companies get off the ground. The workload can be pretty heavy, especially around exam time, but the group projects make it worthwhile because I get to bounce ideas off really bright people.",
    tips: [
      "Answer the question directly in your first sentence, then extend with a reason and a concrete detail.",
      "Use the present continuous for current situations (‘I'm studying…’, ‘I'm working on…’) to sound natural.",
      "Avoid reciting a memorised self-introduction; examiners notice and it can lower your fluency score.",
    ],
  },
  {
    id: 's1-02',
    topic: 'Hometown',
    questions: [
      "Where is your hometown?",
      "What do you like about your hometown?",
      "Has your hometown changed much since you were a child?",
      "Is it a good place for young people to live?",
      "Would you like to live there in the future?",
    ],
    sample:
      "I come from a mid-sized coastal city in the south of my country. It's not exactly famous, but it's got a really laid-back atmosphere, and you're never more than ten minutes from the sea. What I love most is the street food scene; on almost every corner there's someone selling grilled seafood late into the evening, so it's a real paradise for food lovers.",
    tips: [
      "Give a simple location first, then one or two features that make the place special to you.",
      "Prepare adjectives beyond ‘beautiful’ and ‘crowded’: try ‘laid-back’, ‘bustling’, ‘up-and-coming’, ‘close-knit’.",
      "For questions about change, contrast past and present tenses clearly (‘used to’ vs ‘now’).",
    ],
  },
  {
    id: 's1-03',
    topic: 'Home and accommodation',
    questions: [
      "Do you live in a house or an apartment?",
      "Which room do you spend the most time in?",
      "What would you like to change about your home?",
      "Do you plan to live there for a long time?",
      "What kind of home would you like to have in the future?",
    ],
    sample:
      "I live in a fairly small apartment on the eighth floor of a block near the city centre. It's a bit cramped, to be honest, but the location more than makes up for it, since I can walk to work in about fifteen minutes. The best part is the balcony; I've filled it with plants, so it feels like a little green escape after a long day.",
    tips: [
      "Mention size, location and one feature you like or dislike, and give a short reason.",
      "Use concessive language to sound balanced: ‘It's a bit small, but…’, ‘It more than makes up for it…’.",
    ],
  },
  {
    id: 's1-04',
    topic: 'Daily routine',
    questions: [
      "What is your daily routine like?",
      "Which part of the day do you like most?",
      "Is your routine the same every day?",
      "Have you changed your routine recently?",
      "Do you think it is important to have a routine?",
    ],
    sample:
      "On weekdays my routine is pretty fixed. I'm up at around six, I grab a quick coffee and then I head to the office, where I'm usually glued to my screen until five. Evenings are my favourite part because that's when I finally unwind; I normally go for a jog by the river and then cook something simple while listening to a podcast.",
    tips: [
      "Use the present simple with frequency adverbs (‘usually’, ‘normally’, ‘every now and then’).",
      "Sequence your answer with linkers like ‘first’, ‘after that’, ‘by the time’ rather than listing every minute.",
      "Pick one highlight of the day and explain why you enjoy it.",
    ],
  },
  {
    id: 's1-05',
    topic: 'Weekends',
    questions: [
      "What do you usually do at weekends?",
      "What did you do last weekend?",
      "Do you prefer to spend weekends at home or going out?",
      "Are weekends in your country different from when you were a child?",
      "Do you ever have to work or study at weekends?",
    ],
    sample:
      "Honestly, I try to keep my weekends as relaxed as possible because the week is so hectic. On Saturdays I usually sleep in and then meet a couple of friends for brunch, and on Sundays I tend to stay at home, catch up on chores and maybe watch a series. It's nothing exciting, but it really helps me recharge my batteries for Monday.",
    tips: [
      "Questions about ‘last weekend’ need the past simple; check your tense as soon as you hear the question.",
      "Show range by contrasting a typical weekend with a special one.",
    ],
  },
  {
    id: 's1-06',
    topic: 'Food',
    questions: [
      "What kind of food do you like?",
      "Is there any food you dislike?",
      "Do you prefer eating at home or in restaurants?",
      "How often do you cook?",
      "Has your diet changed since you were a child?",
      "What is a popular dish in your country?",
    ],
    sample:
      "I'd say I'm a big fan of noodle soups. There's something really comforting about a steaming bowl of broth, especially on a rainy evening. My absolute favourite is a beef noodle soup that a tiny family-run place near my office makes; the broth simmers for hours, so it's incredibly rich, and they're generous with fresh herbs, which gives it a lovely, zesty kick.",
    tips: [
      "Describe taste and texture with precise words: ‘rich’, ‘zesty’, ‘crunchy’, ‘mild’, ‘savoury’.",
      "It's fine to name a local dish, but briefly explain what it is so the examiner can follow.",
      "Use ‘I'm a big fan of…’ or ‘I can't get enough of…’ instead of repeating ‘I like’.",
    ],
  },
  {
    id: 's1-07',
    topic: 'Music',
    questions: [
      "What kind of music do you like?",
      "When do you usually listen to music?",
      "Have your musical tastes changed over the years?",
      "Did you learn to play an instrument as a child?",
      "Do you prefer listening to live music or recordings?",
    ],
    sample:
      "My taste is pretty eclectic, but if I had to pick one genre, it'd be acoustic pop. I find it really soothing, so I usually have it on in the background when I'm studying or commuting. Lately I've been listening to a lot of indie singer-songwriters because their lyrics feel more personal and down-to-earth than mainstream chart music.",
    tips: [
      "Use the present perfect continuous for recent habits: ‘Lately I've been listening to…’.",
      "Explain the effect music has on you (‘it calms me down’, ‘it gets me pumped up’).",
    ],
  },
  {
    id: 's1-08',
    topic: 'Reading',
    questions: [
      "Do you like reading?",
      "What kinds of books do you read?",
      "Do you prefer paper books or e-books?",
      "Did you read a lot when you were a child?",
      "Is reading popular in your country?",
    ],
    sample:
      "Yes, I do, although I don't read as much as I'd like these days. I'm mostly into non-fiction, particularly books about psychology and how people make decisions. I usually read on my phone during my commute because it's so convenient, but whenever I find a book I really love, I end up buying a paper copy so I can scribble notes in the margins.",
    tips: [
      "‘Yes’ or ‘No’ alone is never enough; add a qualification like ‘although…’ or ‘not as much as I used to’.",
      "Prepare the names of a few genres: ‘non-fiction’, ‘biographies’, ‘thrillers’, ‘self-help’, ‘graphic novels’.",
    ],
  },
  {
    id: 's1-09',
    topic: 'Sport and exercise',
    questions: [
      "Do you like sport?",
      "What sports are popular in your country?",
      "How often do you exercise?",
      "Did you play any sports at school?",
      "Do you prefer watching sport or playing it?",
    ],
    sample:
      "I wouldn't call myself sporty, but I do try to stay active. I play badminton with a few colleagues twice a week, mainly because it's sociable and doesn't require much equipment. It's surprisingly intense, actually; after an hour of chasing the shuttlecock around the court I'm completely drenched in sweat, but I always feel much more energetic afterwards.",
    tips: [
      "If you don't like sport, say so honestly and talk about another way you keep fit.",
      "Use collocations: ‘stay active’, ‘keep fit’, ‘work out’, ‘build up stamina’.",
      "Add a short personal detail to make the answer memorable.",
    ],
  },
  {
    id: 's1-10',
    topic: 'Weather',
    questions: [
      "What is the weather usually like where you live?",
      "What kind of weather do you like best?",
      "Does the weather affect your mood?",
      "Do you check the weather forecast often?",
      "Has the weather in your area changed in recent years?",
    ],
    sample:
      "Where I live it's tropical, so it's hot and humid for most of the year, with a rainy season that lasts several months. Personally I prefer the cooler, drier spell around the end of the year. The air feels fresher and you can actually walk around outside without getting soaked, either by sweat or by a sudden downpour, which happens a lot in summer.",
    tips: [
      "Learn weather vocabulary beyond ‘hot’ and ‘cold’: ‘humid’, ‘muggy’, ‘a downpour’, ‘a heatwave’, ‘a cold snap’.",
      "Link the weather to your feelings or activities to extend the answer naturally.",
    ],
  },
  {
    id: 's1-11',
    topic: 'Transport',
    questions: [
      "How do you usually travel around your city?",
      "What is public transport like where you live?",
      "Do you prefer travelling by bus or by train?",
      "How do you think transport will change in the future?",
      "Did you ride a bicycle when you were young?",
    ],
    sample:
      "Mostly I get around on a motorbike, because it's by far the quickest way to weave through traffic in my city. The bus network has improved a lot recently, but the routes don't really cover my neighbourhood, so it isn't practical for me. That said, during the rush hour even a motorbike crawls along, so I often leave home early to beat the traffic.",
    tips: [
      "Use phrasal verbs: ‘get around’, ‘set off’, ‘pick someone up’, ‘drop someone off’.",
      "Give a reason for your choice of transport (speed, cost, convenience, comfort).",
    ],
  },
  {
    id: 's1-12',
    topic: 'Shopping',
    questions: [
      "Do you enjoy shopping?",
      "Do you prefer shopping online or in shops?",
      "What was the last thing you bought?",
      "Are there many shopping centres where you live?",
      "Do you ever buy things you don't really need?",
    ],
    sample:
      "It depends on what I'm buying, really. I quite like browsing in bookshops or markets, but I can't stand shopping for clothes in crowded malls. These days I do most of my shopping online because it saves so much time, and you can compare prices in seconds. The only downside is that it's far too easy to make impulse purchases late at night.",
    tips: [
      "‘It depends’ is a great opener, but you must then explain what it depends on.",
      "Useful phrases: ‘window-shopping’, ‘impulse buy’, ‘shop around’, ‘a bargain’, ‘splash out on’.",
    ],
  },
  {
    id: 's1-13',
    topic: 'Technology and phones',
    questions: [
      "How often do you use your mobile phone?",
      "What do you mainly use your phone for?",
      "Could you live without your phone for a week?",
      "Do you think people spend too much time on their phones?",
      "What was the first phone you had?",
    ],
    sample:
      "Far more often than I'd like to admit. I use it for pretty much everything, from banking and messaging to finding my way around the city. Recently I've started setting a daily screen-time limit, because I noticed I was mindlessly scrolling through social media before bed and it was really eating into my sleep. It's helped a lot, actually.",
    tips: [
      "Honest, self-aware answers (‘more than I'd like to admit’) sound natural and show range.",
      "Prepare verbs for phone use: ‘scroll through’, ‘keep in touch’, ‘look something up’, ‘switch off’.",
      "Don't list every app; choose one or two uses and develop them.",
    ],
  },
  {
    id: 's1-14',
    topic: 'Friends',
    questions: [
      "Do you have many friends?",
      "How often do you see your friends?",
      "What do you usually do together?",
      "Is it easy to make new friends as an adult?",
      "What makes someone a good friend?",
    ],
    sample:
      "I wouldn't say I have a huge circle of friends, but I've got a handful of really close ones I've known since secondary school. We're all busy with work now, so we only meet up about once a month, usually for a long dinner. Even so, whenever we get together it feels as if no time has passed, which I think is the sign of a real friendship.",
    tips: [
      "Distinguish between ‘acquaintances’, ‘close friends’ and ‘a circle of friends’.",
      "Use idioms carefully: ‘get on like a house on fire’, ‘see eye to eye’, ‘drift apart’.",
    ],
  },
  {
    id: 's1-15',
    topic: 'Family',
    questions: [
      "Do you have a large family?",
      "Who are you closest to in your family?",
      "How much time do you spend with your family?",
      "Do you live with your family?",
      "What do you usually do together as a family?",
    ],
    sample:
      "Not really. It's just my parents, my younger brother and me, although we've got loads of relatives on my mum's side. I'd say I'm closest to my brother; there are only two years between us, so we grew up doing everything together. Even now we share a flat in the city, and we often cook dinner together and talk about our week.",
    tips: [
      "Use family vocabulary accurately: ‘relatives’, ‘extended family’, ‘on my father's side’, ‘take after’.",
      "Avoid just listing family members; choose one person and say something specific about them.",
    ],
  },
  {
    id: 's1-16',
    topic: 'Holidays',
    questions: [
      "Where do you like to go on holiday?",
      "Do you prefer holidays by the sea or in the mountains?",
      "Who do you usually go on holiday with?",
      "What was your best holiday as a child?",
      "Do you like to plan your holidays carefully?",
    ],
    sample:
      "I'm definitely more of a mountain person than a beach person. I love escaping to cooler places in the highlands where I can go hiking and just breathe in the fresh air. Last year I spent a few days in a small village surrounded by terraced rice fields, and waking up to that view every morning was absolutely breathtaking. I'd go back in a heartbeat.",
    tips: [
      "‘I'm more of a … person’ is a natural way to state a preference.",
      "A quick past example (‘Last year I…’) adds detail and shows tense control.",
      "Use strong adjectives with ‘absolutely’: ‘absolutely breathtaking’, ‘absolutely exhausting’.",
    ],
  },
  {
    id: 's1-17',
    topic: 'Hobbies',
    questions: [
      "What do you like to do in your free time?",
      "How long have you had this hobby?",
      "Did you have the same hobbies as a child?",
      "Do you prefer doing hobbies alone or with others?",
      "Is there a new hobby you would like to try?",
    ],
    sample:
      "In my spare time I'm really into photography, mostly street photography. I picked it up about three years ago when I bought a second-hand camera, and I've been hooked ever since. I love wandering around old neighbourhoods early on Sunday mornings, trying to capture little everyday moments, like vendors setting up their stalls, before the city gets too busy.",
    tips: [
      "Use ‘pick up’ (start a hobby), ‘be hooked on’, ‘get into’ and ‘take up’.",
      "For ‘How long’ questions, use the present perfect: ‘I've been doing it for… / since…’.",
    ],
  },
  {
    id: 's1-18',
    topic: 'Clothes',
    questions: [
      "What kind of clothes do you usually wear?",
      "Do you wear different clothes at weekends?",
      "Do you care about fashion?",
      "Where do you usually buy your clothes?",
      "Did you wear a uniform at school?",
    ],
    sample:
      "I tend to go for simple, comfortable clothes, so most days you'll find me in jeans and a plain T-shirt. My job doesn't have a strict dress code, which is lucky, because I really can't stand wearing a tie. I'm not that into fashion trends, to be honest; I'd rather buy a few good-quality basics that last for years than keep up with every new style.",
    tips: [
      "Useful language: ‘dress code’, ‘smart-casual’, ‘go out of fashion’, ‘dress up’, ‘dress down’.",
      "Express preferences with ‘I'd rather… than…’ to show grammatical range.",
    ],
  },
  {
    id: 's1-19',
    topic: 'Art',
    questions: [
      "Do you like art?",
      "Have you ever been to an art gallery?",
      "Did you enjoy drawing or painting as a child?",
      "What kind of art is popular in your country?",
      "Would you like to learn an artistic skill?",
    ],
    sample:
      "I do, although I'm no expert. I'm particularly drawn to photography and street art, because they feel more accessible than the classical paintings you see in big museums. There's a lane near my university covered in murals, and I often take a detour just to see what new pieces have appeared. It's a great way to clear my head between classes.",
    tips: [
      "It's fine to admit you're ‘no expert’ — then talk about the kind of art you personally connect with.",
      "Vocabulary: ‘mural’, ‘exhibition’, ‘abstract’, ‘landscape’, ‘be drawn to’.",
    ],
  },
  {
    id: 's1-20',
    topic: 'Films and movies',
    questions: [
      "Do you like watching films?",
      "What kind of films do you enjoy?",
      "Do you prefer watching films at home or in a cinema?",
      "Who do you usually watch films with?",
      "Is there a film you have watched more than once?",
    ],
    sample:
      "Absolutely, it's one of my favourite ways to unwind. I'm mainly into science-fiction films because I love how they make you think about where society might be heading. I usually watch at home on a streaming service, but if a big release comes out, I'll go to the cinema with friends, since the sound and the huge screen make it a completely different experience.",
    tips: [
      "Name genres accurately: ‘thriller’, ‘romantic comedy’, ‘documentary’, ‘animated film’.",
      "Use ‘if’ clauses to describe conditions: ‘If a big release comes out, I'll…’.",
      "You don't need to know actors' names; focus on why you enjoy the genre.",
    ],
  },
  {
    id: 's1-21',
    topic: 'Sleep',
    questions: [
      "How many hours do you usually sleep?",
      "Do you ever take a nap during the day?",
      "Is it easy for you to fall asleep at night?",
      "What do you do if you can't sleep?",
      "Do you think people get enough sleep nowadays?",
    ],
    sample:
      "Probably around six hours on weeknights, which I know isn't really enough. I'm a bit of a night owl, so I find it hard to switch off before midnight. At weekends I try to make up for it by sleeping in, and I'll sometimes have a short power nap after lunch. Those twenty minutes really help me get through the afternoon.",
    tips: [
      "Idioms such as ‘night owl’, ‘early bird’, ‘sleep like a log’ and ‘toss and turn’ fit naturally here.",
      "Give an approximate number, then explain whether it's enough and why.",
    ],
  },
  {
    id: 's1-22',
    topic: 'Birthdays',
    questions: [
      "How do you usually celebrate your birthday?",
      "How did you celebrate birthdays as a child?",
      "Do you think birthdays are important?",
      "What was the best birthday present you ever received?",
      "Do you remember your friends' birthdays?",
    ],
    sample:
      "To be honest, I keep it pretty low-key these days. I usually just have dinner with my family at home, and my mum always insists on cooking my favourite dishes. When I was little it was a much bigger deal; there'd be a cake, balloons and loads of classmates running around, but now I'd much rather spend a quiet evening with the people I'm closest to.",
    tips: [
      "Contrast childhood and now using ‘used to’ or ‘would’ for past habits.",
      "Collocations: ‘throw a party’, ‘blow out the candles’, ‘make a wish’, ‘low-key celebration’.",
    ],
  },
  {
    id: 's1-23',
    topic: 'The internet',
    questions: [
      "How often do you use the internet?",
      "What do you mainly use the internet for?",
      "When did you first start using the internet?",
      "Do you think children should use the internet?",
      "Could you manage without the internet for a day?",
    ],
    sample:
      "Pretty much all day, every day, mainly because my job is entirely online. Outside work, I mostly use it for learning things; I'm always watching tutorials, whether it's how to fix a leaking tap or how to cook a new dish. I genuinely think it's the best free classroom ever invented, as long as you're careful about which sources you trust.",
    tips: [
      "Show balance: mention a benefit and add a small caution (‘as long as…’, ‘provided that…’).",
      "Vocabulary: ‘go online’, ‘browse’, ‘a reliable source’, ‘stream’, ‘be addicted to’.",
    ],
  },
  {
    id: 's1-24',
    topic: 'Noise',
    questions: [
      "Is the area where you live quiet or noisy?",
      "What kinds of noise do you dislike?",
      "Are there any sounds you find relaxing?",
      "Do you think cities are noisier than they used to be?",
      "Do you prefer to study or work in a quiet place?",
    ],
    sample:
      "It's quite noisy, unfortunately, because my apartment overlooks a main road. There's a constant hum of traffic, and drivers seem to beep their horns for no reason at all. I've got used to it over the years, but when I really need to concentrate I put on noise-cancelling headphones and listen to recordings of rain, which instantly calms me down.",
    tips: [
      "Use ‘get used to’ + -ing/noun for situations that became normal over time.",
      "Sound words impress: ‘hum’, ‘honk/beep’, ‘rustle’, ‘chatter’, ‘deafening’, ‘soothing’.",
      "Mention how you cope with noise to extend the answer with a solution.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Speaking Part 2 cue cards + linked Part 3 discussion                */
/* ------------------------------------------------------------------ */

export const cueCards: CueCard[] = [
  /* ----------------------------- People ----------------------------- */
  {
    id: 's2-01',
    topic: 'A person who helped you',
    prompt: "Describe a person who helped you at an important time in your life.",
    bullets: [
      "who this person is",
      "when this happened",
      "how they helped you",
      "and explain why their help was important to you.",
    ],
    part3: [
      "Why do some people find it hard to ask for help?",
      "Do you think people help each other less than they did in the past?",
      "Who should be responsible for helping elderly people: families or the government?",
      "How can schools encourage children to help others?",
      "Is it better to help people with money or with time?",
    ],
    sample:
      "The person I'd like to talk about is a former colleague of mine called Minh, who helped me out enormously when I started my first proper job, about four years ago.\n\nI'd just graduated, and to be honest I was completely out of my depth. The company was much bigger than I'd expected, everyone seemed to speak in acronyms, and in my first week my manager handed me a report that I didn't even know how to begin. I remember sitting at my desk, staring at the screen and thinking, I've made a terrible mistake.\n\nMinh sat a couple of desks away, and I think he must have noticed the look of panic on my face, because he wandered over at lunchtime and asked if I wanted to grab some food. Over a bowl of noodles he basically walked me through how the department worked, who to ask about what, and which deadlines really mattered. After that, he made a point of checking in on me every few days, and whenever I got stuck he'd sit down with me and talk me through the problem rather than just fixing it himself.\n\nI mean, what made his help so important wasn't really the technical stuff. It was the fact that he gave me confidence at a moment when I was seriously doubting myself. If he hadn't stepped in, I honestly think I might have quit within a couple of months. Instead, I stayed for three years and ended up being promoted.\n\nThese days I try to pay it forward. Whenever someone new joins my team, I remember how lost I felt and I make sure they've got someone to turn to, just like I had Minh.",
    part3Sample:
      "I think pride is the main reason. Many people, especially men and older generations, have grown up believing that asking for help is a sign of weakness, so they'd rather struggle on alone. For example, a lot of my friends would never admit they were struggling at university, even when they were clearly falling behind. Another factor is fear of being a burden; people worry about taking up others' time. That said, I think attitudes are slowly changing, because younger people are more open about mental health and seem far more comfortable reaching out when they need support.",
    vocabulary: [
      "be out of my depth",
      "help someone out",
      "walk someone through something",
      "check in on someone",
      "step in",
      "doubt myself",
      "someone to turn to",
      "pay it forward",
      "a sign of weakness",
      "reach out for support",
    ],
  },
  {
    id: 's2-02',
    topic: 'An older person you admire',
    prompt: "Describe an older person you know whom you admire.",
    bullets: [
      "who this person is",
      "how you know them",
      "what they do or have done",
      "and explain why you admire them.",
    ],
    part3: [
      "What can young people learn from older people?",
      "Do older people play an important role in families in your country?",
      "How has the life of older people changed in recent decades?",
      "Should older people continue working after retirement age?",
      "What problems might arise when different generations live together?",
    ],
    sample:
      "I'd like to talk about my great-aunt, who's in her late seventies now and lives in a small town about two hours from where I grew up. I've known her all my life, obviously, but I only really got to know her properly a few years ago, when I spent a summer helping out in her garden.\n\nShe's a retired primary school teacher, and she taught in the same village school for nearly forty years. What's remarkable is that she still hasn't really retired in spirit. Every afternoon, kids from the neighbourhood turn up at her house, and she helps them with their reading and maths for free. Her living room is basically a little classroom, with piles of books everywhere and children's drawings stuck all over the walls.\n\nThe thing I admire most about her is her energy and her curiosity. She's got a bad knee and she can't walk very far any more, but she never complains. Instead, she taught herself to use a tablet so she could video-call her grandchildren abroad, and last year she even started learning English through an app, which I find amazing at her age. Whenever I visit, she asks me loads of questions about my job and what's going on in the world, and she actually listens to the answers.\n\nI suppose she's shown me that getting older doesn't have to mean slowing down mentally. I mean, a lot of people I know in their twenties already seem stuck in their ways, whereas she's still open to new ideas. Honestly, if I'm half as sharp and generous as she is when I reach her age, I'll be really happy.",
    part3Sample:
      "I'd say the most valuable thing young people can learn is patience and perspective. Older people have lived through hard times, so they tend to see today's problems in a calmer, longer-term way. For instance, my grandfather lived through a period of real food shortages, and listening to him makes me think twice before wasting anything. On the other hand, I don't think the learning only goes one way; older people can pick up a lot from the young too, especially when it comes to technology, so ideally it should be a two-way exchange.",
    vocabulary: [
      "in her late seventies",
      "get to know someone properly",
      "retired in spirit",
      "teach yourself to do something",
      "never complain",
      "stuck in your ways",
      "open to new ideas",
      "mentally sharp",
      "live through hard times",
      "a two-way exchange",
    ],
  },
  {
    id: 's2-03',
    topic: 'Someone who is very good at their job',
    prompt: "Describe someone you know who is very good at their job.",
    bullets: [
      "who this person is",
      "what job they do",
      "how you know about their work",
      "and explain why you think they are so good at it.",
    ],
    part3: [
      "What qualities make someone successful at work?",
      "Is it more important to enjoy your job or to earn a high salary?",
      "Should people stay in the same job for a long time?",
      "How can employers keep their staff motivated?",
      "Do you think some jobs deserve more respect than they get?",
    ],
    sample:
      "The person who springs to mind is the woman who runs the small pharmacy at the end of my street. I don't actually know her surname, but everyone in the neighbourhood just calls her Auntie Lan, and she's been working there for as long as I can remember.\n\nOn paper, her job sounds fairly simple: she sells medicine and gives basic health advice. But honestly, she does it so well that people come from other districts just to see her. I've been going there since I was a teenager, so I've watched her deal with hundreds of customers over the years.\n\nWhat really sets her apart is the way she listens. A lot of pharmacists just hand you whatever you ask for, but she always asks a few careful questions first, like how long you've had the symptoms, whether you're taking anything else, and so on. Once, I went in asking for strong painkillers for a headache that just wouldn't go away, and instead of selling them to me she told me, quite firmly, to go and get my eyes tested. It turned out I needed glasses, and the headaches disappeared within a week.\n\nShe's also got an incredible memory. She remembers which elderly customers have heart problems and which kids are allergic to certain things, so she's a kind of unofficial family doctor for the whole street.\n\nI think she's brilliant at her job because she genuinely cares about people rather than just making a sale. I mean, she could easily earn more by pushing expensive products, but she'd rather lose a sale than give bad advice, and that's why everyone trusts her completely.",
    part3Sample:
      "In my view, the most important quality is reliability, more than raw talent. If colleagues know you'll deliver what you promise on time, they'll trust you with bigger responsibilities. A good example is my cousin, who wasn't the most gifted engineer in his company, but he never missed a deadline, so he was promoted ahead of people who were technically stronger. Communication skills matter a lot too, because brilliant ideas are useless if you can't explain them. Having said that, in highly technical fields like surgery, genuine expertise obviously has to come first.",
    vocabulary: [
      "spring to mind",
      "on paper",
      "set someone apart",
      "deal with customers",
      "go the extra mile",
      "genuinely care about people",
      "make a sale",
      "earn someone's trust",
      "unofficial family doctor",
      "deliver on a promise",
    ],
  },
  {
    id: 's2-04',
    topic: 'A person who taught you a useful skill',
    prompt: "Describe a person who taught you a skill that is useful in your daily life.",
    bullets: [
      "who this person is",
      "what skill they taught you",
      "how they taught you",
      "and explain why this skill is useful to you.",
    ],
    part3: [
      "What practical skills should every young person learn?",
      "Are parents or schools better at teaching life skills?",
      "Is it easier to learn skills from videos or from a real person?",
      "Why do some people stop learning new skills as they get older?",
      "Which skills do you think will be most valuable in the future?",
    ],
    sample:
      "I'm going to talk about my older sister, who taught me how to cook when I moved out of my parents' house to go to university, which was about six years ago now.\n\nBefore that, I'd never cooked anything more complicated than instant noodles, to be honest. My mum always did all the cooking at home, so when I found myself living in a tiny rented room with a single gas ring, I was basically surviving on takeaways and fast food. After about a month I was skint and feeling pretty unhealthy, so I called my sister in a bit of a panic.\n\nShe didn't just send me recipes. Instead, every Sunday for about two months, she'd video-call me while she was cooking dinner, and I'd cook the same dish alongside her. She'd show me really practical things, like how to chop an onion without crying, how to tell when rice is properly cooked, and how to use leftovers so nothing went to waste. When I messed something up, which happened a lot at the beginning, she'd just laugh and tell me what to do differently next time.\n\nThis skill has been genuinely life-changing, I mean that. For one thing, I save a huge amount of money, because cooking at home costs about a third of eating out. I'm also much healthier, since I know exactly what goes into my food. And it's become a social thing, too; my flatmates and I now take turns cooking for each other, which is a lovely way to end the day.\n\nWhenever I make one of her dishes now, I still think of those Sunday video calls.",
    part3Sample:
      "I strongly believe every young person should learn to manage money. Things like budgeting, understanding interest and avoiding debt aren't usually taught properly at school, yet they affect almost every decision we make as adults. For example, a friend of mine got into serious credit card debt in her first year of work simply because nobody had explained how interest builds up. Cooking and basic first aid are also essential. In contrast, I think skills like handwriting, which schools still spend a lot of time on, are becoming far less relevant in a digital world.",
    vocabulary: [
      "move out of my parents' house",
      "survive on takeaways",
      "be skint (informal)",
      "go to waste",
      "mess something up",
      "life-changing",
      "eat out",
      "take turns",
      "practical life skills",
      "learn by doing",
    ],
  },
  {
    id: 's2-05',
    topic: 'Someone who does good things for the community',
    prompt: "Describe a person in your area who does something good for the local community.",
    bullets: [
      "who this person is",
      "what they do",
      "how you found out about it",
      "and explain how the community benefits from what they do.",
    ],
    part3: [
      "Why do some people choose to do voluntary work?",
      "Should volunteering be compulsory for students?",
      "Is the sense of community weaker in cities than in the countryside?",
      "What can local governments do to strengthen communities?",
      "Do you think social media brings communities together or divides them?",
    ],
    sample:
      "The person I want to describe is a retired mechanic who lives a few streets away from me. His name's Mr Hai, and he must be in his mid-sixties.\n\nEvery Saturday morning, he sets up a little table and a toolbox on the pavement outside his house and repairs bicycles for free. Mostly it's kids from the neighbourhood and students who can't afford to pay a repair shop, but delivery riders often stop by too. He fixes flat tyres, adjusts brakes, replaces chains, that kind of thing, and he only asks people to pay for spare parts if they really need new ones.\n\nI actually found out about it by accident. About two years ago, my bike chain snapped on my way to the market, and I was pushing it home, feeling really fed up, when he waved me over. Within ten minutes he'd fixed it and refused to take any money. I was so surprised that I started chatting to him, and he told me he'd been doing it since he retired because he didn't want his skills to go to waste.\n\nI think the community benefits in a few ways. Obviously, it saves people money, which really matters for families on a tight budget. But beyond that, his little repair stand has become a kind of meeting point. Neighbours stop for a chat, older people bring him tea, and kids hang around watching him work, so he's actually teaching them practical skills without even trying. I mean, in a big city where people often don't know their neighbours' names, he's created a real sense of connection, and that's worth far more than a few repaired bikes.",
    part3Sample:
      "I think most people volunteer because it gives them a sense of purpose that paid work doesn't always provide. Helping others directly, and seeing the results, can be incredibly rewarding. My neighbour, for example, works in an office all week but spends Sundays teaching English to children in a rural area, and she says it's the most meaningful part of her life. Some people also volunteer for more practical reasons, like gaining experience for their CV. I don't see anything wrong with that, as long as the community still benefits.",
    vocabulary: [
      "set up a stall",
      "free of charge",
      "find out by accident",
      "feel fed up",
      "spare parts",
      "on a tight budget",
      "a meeting point",
      "a sense of connection",
      "a sense of purpose",
      "give something back to the community",
    ],
  },
  /* ----------------------------- Places ----------------------------- */
  {
    id: 's2-06',
    topic: 'A quiet place you like to go',
    prompt: "Describe a quiet place you like to go to when you want to relax.",
    bullets: [
      "where this place is",
      "how often you go there",
      "what you do there",
      "and explain why it helps you to relax.",
    ],
    part3: [
      "Why do many people find it difficult to relax nowadays?",
      "Are there enough quiet public spaces in cities?",
      "Do you think people need more time alone?",
      "How do young and old people relax differently?",
      "Should employers be responsible for reducing their staff's stress?",
    ],
    sample:
      "The place I'd like to talk about is a small lakeside café on the outskirts of my city. It's about a twenty-minute ride from my flat, tucked away behind a row of old trees, so most people drive past without even noticing it.\n\nI try to go there at least once a fortnight, usually on a weekday afternoon when I've got some free time, because at weekends it can get a bit busier. It's a simple place, nothing fancy: just a wooden deck with a few tables that look out over the water, and an elderly couple who make really strong coffee.\n\nWhat do I do there? Honestly, not much, and that's kind of the point. Sometimes I bring a book, sometimes I write in a journal, but quite often I just sit and watch the fishermen on the other side of the lake, or the light changing on the water. I make a rule of keeping my phone in my bag, which is surprisingly hard at first.\n\nI think it helps me relax for a couple of reasons. First of all, it's genuinely quiet. In the city centre there's a constant background noise of traffic and construction, and I don't think I realised how much it was stressing me out until I found this place. Here, all you can hear is the wind in the trees and the odd bird. Secondly, it's somewhere nobody expects anything from me. I mean, at work and even at home there's always something I should be doing, but at the café I can just switch off completely.\n\nWhenever I leave, I feel as if I've pressed a reset button.",
    part3Sample:
      "I think the biggest reason is that technology has blurred the line between work and free time. Because we carry our phones everywhere, we're always reachable, so it's very hard to mentally switch off. My brother, for instance, answers work emails during family dinners because he's worried about missing something important. There's also a lot of pressure to be productive all the time, even with hobbies. In contrast, my grandparents' generation had clear boundaries: once they left work, it simply couldn't follow them home, so they could relax properly.",
    vocabulary: [
      "on the outskirts of",
      "tucked away",
      "nothing fancy",
      "look out over",
      "that's kind of the point",
      "stress someone out",
      "switch off completely",
      "press a reset button",
      "blur the line between",
      "always reachable",
    ],
  },
  {
    id: 's2-07',
    topic: 'A city you would like to visit',
    prompt: "Describe a city you have never been to but would like to visit in the future.",
    bullets: [
      "which city it is",
      "how you learned about it",
      "what you would like to do there",
      "and explain why you want to visit this city.",
    ],
    part3: [
      "Why do people enjoy visiting cities in other countries?",
      "What are the negative effects of tourism on popular cities?",
      "Is it better to travel independently or on a guided tour?",
      "How has the internet changed the way people choose travel destinations?",
      "Do you think people will travel more or less in the future?",
    ],
    sample:
      "A city I've wanted to visit for ages is Lisbon, the capital of Portugal. I've never been to Europe at all, actually, so it would be a pretty big trip for me.\n\nI first came across it in a travel documentary I watched a couple of years ago, during a long, rainy weekend when I had nothing better to do. The presenter was wandering through these steep, narrow streets lined with buildings covered in blue and white tiles, and there were old yellow trams rattling up the hills. I remember thinking, wow, that looks like a film set. Since then I've watched loads of travel vlogs about it, so I've got a rough plan in my head already.\n\nIf I ever get there, the first thing I'd do is ride one of those old trams from one end of the route to the other, just to get a feel for the city. I'd also love to explore the old neighbourhoods on foot, ideally getting completely lost, and try the famous custard tarts, which apparently are best eaten warm with a sprinkle of cinnamon. And I'd want to catch a sunset from one of the viewpoints on the hills overlooking the river.\n\nAs for why I'm so keen, I think it's because it seems to have a really relaxed pace of life compared with the huge, fast-moving cities I'm used to. I mean, it's a capital, but it looks almost like a big village in places. It's also said to be more affordable than other Western European capitals, which matters on my budget. I'm hoping to save up and go within the next couple of years.",
    part3Sample:
      "I think the main appeal is the chance to experience a completely different way of life, even for a short time. Walking through a foreign city, hearing a new language and trying unfamiliar food can be really eye-opening. When I visited a neighbouring country for the first time, for example, I was struck by how differently people queued and greeted each other, which made me rethink habits I'd always taken for granted. Of course, some tourists simply want good shopping or nightlife, and that's fine too, but I'd say curiosity is the deeper motivation for most people.",
    vocabulary: [
      "for ages",
      "come across something",
      "lined with",
      "get a feel for a place",
      "get completely lost",
      "a relaxed pace of life",
      "be keen to do something",
      "on a budget",
      "eye-opening",
      "take something for granted",
    ],
  },
  {
    id: 's2-08',
    topic: 'A market or place where you buy food',
    prompt: "Describe a market or shop where you often buy food.",
    bullets: [
      "where it is",
      "what it sells",
      "how often you go there",
      "and explain why you like shopping there.",
    ],
    part3: [
      "Why do some people still prefer traditional markets to supermarkets?",
      "How have people's food-shopping habits changed in recent years?",
      "Should governments protect small local shops from large chains?",
      "Is it a good idea to buy food online?",
      "Do you think people waste too much food nowadays?",
    ],
    sample:
      "I'd like to describe a wet market that's about a five-minute walk from my apartment. It's been there for decades, way before all the shiny supermarkets and convenience stores opened in my area.\n\nIt's not very big, maybe forty or fifty stalls packed under a corrugated iron roof, but it sells pretty much everything you need for home cooking. There's a section for fresh vegetables and herbs, another for fish and seafood, and a few butchers at the back. Around the edges there are stalls selling things like tofu, rice, spices and homemade sauces, and a couple of women who sell breakfast in the early morning.\n\nI go there about three times a week, usually first thing in the morning before work, because that's when the produce is freshest. If you turn up after ten, the best stuff has usually gone.\n\nThere are a few reasons I prefer it to the supermarket. The most obvious is freshness; the fish is often still alive and the vegetables were probably picked the day before. It's also cheaper, and you can haggle a little, especially if you're a regular. But honestly, what I like most is the human side of it. Over time I've got to know the stallholders, so the vegetable lady saves me the best bunch of herbs, and the fishmonger will tell me straight away if something isn't worth buying that day. I mean, you'd never get that kind of personal service at a supermarket checkout.\n\nThe only drawback is that it gets quite crowded and noisy, and it's not great when it rains. But for me, the atmosphere is part of the charm.",
    part3Sample:
      "I think freshness and price are the main reasons, but there's also a strong social element. In a traditional market you build relationships with sellers, so shopping feels like a conversation rather than a transaction. My mother, for example, has bought fish from the same woman for over fifteen years, and they always chat about their families. Supermarkets, on the other hand, are more convenient and hygienic, with fixed prices and air conditioning, which is why younger, busier people tend to prefer them. So really, it depends on whether you value convenience or connection more.",
    vocabulary: [
      "a wet market",
      "a stall / stallholder",
      "fresh produce",
      "first thing in the morning",
      "haggle over the price",
      "a regular (customer)",
      "personal service",
      "part of the charm",
      "a convenience store",
      "a transaction rather than a conversation",
    ],
  },
  {
    id: 's2-09',
    topic: 'An interesting building',
    prompt: "Describe a building in your town or city that you find interesting.",
    bullets: [
      "where the building is",
      "what it looks like",
      "what it is used for",
      "and explain why you find it interesting.",
    ],
    part3: [
      "Should old buildings be preserved or replaced with modern ones?",
      "What makes a building attractive?",
      "How has architecture in your country changed over time?",
      "Do you think public buildings should be designed by famous architects?",
      "How can cities make buildings more environmentally friendly?",
    ],
    sample:
      "The building I'm going to talk about is the old railway station in the centre of my city. It's right next to the main square, so you can't really miss it.\n\nIt was built about a hundred years ago, and it looks completely different from everything around it. It's a long, two-storey building made of pale yellow stone, with tall arched windows and a big clock tower in the middle. Inside, the main hall has a really high ceiling with iron beams and a huge skylight, so it's flooded with natural light during the day. The floor tiles are original, and you can still see the patterns, although they're worn down in places from all the footsteps over the years.\n\nThe interesting thing is that it isn't a station any more. A new station was built on the edge of the city about fifteen years ago, and for a while the old building was just left empty and started falling into disrepair. People were worried it'd be knocked down. But a few years ago it was renovated and turned into a cultural centre, so now the main hall hosts exhibitions, craft markets and even small concerts at weekends.\n\nI find it fascinating because it feels like a bridge between the city's past and its present. I mean, my grandparents used to catch trains there, and now I go there to see art exhibitions. It shows that you don't have to choose between keeping history and moving forward; you can actually give an old building a new lease of life. Honestly, I think more cities should do the same thing instead of replacing everything with glass towers.",
    part3Sample:
      "I believe the most significant old buildings should definitely be preserved, because they give a city its identity and connect people to their history. Once they're demolished, they're gone forever. A good example is the old station in my city, which was turned into a cultural centre instead of being knocked down, and it's now one of the most popular places in town. However, I don't think every old building deserves protection; some are unsafe or impractical, and growing cities need modern housing. So it's really about striking a balance.",
    vocabulary: [
      "two-storey",
      "arched windows",
      "flooded with natural light",
      "worn down",
      "fall into disrepair",
      "be knocked down / demolished",
      "be renovated / turned into",
      "give something a new lease of life",
      "a bridge between the past and the present",
      "strike a balance",
    ],
  },
  {
    id: 's2-10',
    topic: 'A natural place near water',
    prompt: "Describe a natural place near water, such as a river, lake or beach, that you enjoyed visiting.",
    bullets: [
      "where this place is",
      "when you went there",
      "what you did there",
      "and explain why you enjoyed visiting it.",
    ],
    part3: [
      "Why are people attracted to places near water?",
      "What are the main threats to rivers and seas today?",
      "Should access to beautiful natural areas be limited to protect them?",
      "Do children spend enough time in nature these days?",
      "Who should pay to clean up polluted rivers and beaches?",
    ],
    sample:
      "I'd like to talk about a stretch of river in a national park in the north of my country. I went there with three university friends last spring, during a long holiday weekend.\n\nTo get there, we took an overnight bus and then a bumpy ride in the back of a truck, so by the time we arrived we were exhausted. But the moment we saw the river, it was totally worth it. The water was this incredible turquoise colour, and it wound its way between steep limestone cliffs covered in jungle. Apart from a few small wooden houses, there was hardly any sign of people.\n\nWe stayed in a homestay with a local family for two nights. During the day we hired kayaks and paddled downstream for a few hours, stopping whenever we found a little sandy bank where we could swim. At one point we pulled over near a waterfall and just floated in the pool underneath it for ages. In the evenings, the family cooked us fish from the river with sticky rice, and we sat outside chatting while the sky filled with stars.\n\nI think I enjoyed it so much because it was such a contrast with my everyday life. I mean, I live in a city of millions where you can barely see the sky, so being somewhere that quiet and unspoilt felt almost unreal. It also brought our group closer; there's something about sharing a bit of hardship, like the long journey and sore arms from paddling, that creates great memories. I've been meaning to go back ever since, but I'd probably go in the dry season next time.",
    part3Sample:
      "I think water has a naturally calming effect on people. The sound of waves or a flowing river helps us slow down, and many studies suggest being near water lowers stress. Personally, whenever I'm by the sea, I sleep better and feel more relaxed. There are practical reasons too: historically, people settled near water for food, transport and trade, so it's deeply connected to how we live. On the other hand, not everyone loves it; some people are afraid of deep water, and coastal areas can be crowded and expensive, especially in peak season.",
    vocabulary: [
      "a stretch of river",
      "wind its way between",
      "limestone cliffs",
      "a homestay",
      "paddle downstream",
      "unspoilt",
      "totally worth it",
      "a contrast with everyday life",
      "bring people closer",
      "I've been meaning to…",
    ],
  },
  /* ----------------------------- Objects ---------------------------- */
  {
    id: 's2-11',
    topic: 'Something you own that you could not live without',
    prompt: "Describe something you own that you would find it very hard to live without.",
    bullets: [
      "what it is",
      "when you got it",
      "how you use it",
      "and explain why it is so important to you.",
    ],
    part3: [
      "Why do people become attached to their possessions?",
      "Do people today own too many things?",
      "Is it true that money cannot buy happiness?",
      "How do the possessions people value differ between generations?",
      "Why is minimalism becoming popular in some countries?",
    ],
    sample:
      "This might sound a bit boring, but the thing I'd find hardest to live without is my bicycle. It's nothing special to look at, just a dark green city bike with a basket on the front, but it's become a huge part of my life.\n\nI bought it second-hand about three years ago, when I changed jobs and my new office was a bit too far to walk to but not quite far enough to make driving worthwhile. The guy who sold it to me had obviously looked after it really well, so I got a bit of a bargain.\n\nI use it every single day. In the morning I ride it to work, which takes about twenty minutes along a canal path. At weekends I use it to get to the market, and if the weather's nice, I sometimes cycle out to the countryside with a friend. It's also become my thinking time; I've found that I solve a lot of problems while I'm pedalling, because my mind sort of wanders.\n\nThe reason it's so important is that it's given me a kind of freedom I didn't have before. I'm not stuck in traffic jams or squashed on a crowded bus, and I don't have to worry about parking or the cost of fuel. It's also kept me fit without me really noticing. I mean, I've never been a gym person, but I'm in better shape now than I was at university.\n\nOnce, it was in the repair shop for a week and I had to take taxis everywhere. Honestly, I felt completely lost, and that's when I realised how much I depended on it.",
    part3Sample:
      "I think people become attached to possessions because objects carry memories and become part of their identity. A watch from a grandparent, for example, isn't just a watch; it's a link to that person. My mother still keeps a cheap radio she bought with her first salary because it reminds her of how hard she worked when she was young. Possessions can also give us a sense of security and status. However, I'd argue that when people attach too much importance to objects, they can become anxious about losing them, which defeats the purpose.",
    vocabulary: [
      "nothing special to look at",
      "second-hand",
      "a bargain",
      "look after something well",
      "my mind wanders",
      "stuck in traffic",
      "squashed on a crowded bus",
      "be in better shape",
      "depend on something",
      "have sentimental value",
    ],
  },
  {
    id: 's2-12',
    topic: 'A gift you gave to someone',
    prompt: "Describe a gift you gave to someone that they were very happy with.",
    bullets: [
      "what the gift was",
      "who you gave it to",
      "why you chose it",
      "and explain why the person was so pleased with it.",
    ],
    part3: [
      "Is it better to give money or a gift?",
      "Why do people spend so much money on gifts nowadays?",
      "Are handmade gifts more valuable than bought ones?",
      "On what occasions do people give gifts in your country?",
      "Do you think companies use festivals to make people buy more?",
    ],
    sample:
      "The gift I want to talk about is a photo book I made for my grandmother for her eightieth birthday, which was last year.\n\nIt all started a few months earlier, when I was at her house and she was complaining that all her old photos were fading and falling apart in a shoebox under her bed. So I came up with the idea of making her a proper album. Over a couple of weekends, I secretly borrowed the box, scanned around a hundred and fifty photos, and asked my uncles and aunts to send me pictures from their phones too. Then I used an online service to design a book, with the photos in chronological order, starting from her wedding day right up to her newest great-grandchild.\n\nI chose it partly because she's not the kind of person who wants things. I mean, if you buy her clothes or kitchen gadgets, she just puts them in a cupboard and says you shouldn't have wasted your money. I knew that memories would mean far more to her than anything I could buy in a shop.\n\nWhen she opened it at her birthday dinner, she went completely quiet for a moment, and then she started crying, in a good way. She spent the rest of the evening turning the pages and telling stories about each photo, many of which even my parents had never heard. Apparently, she still shows it to every single visitor.\n\nI think she was so pleased because it showed that we valued her life story. It made her feel remembered, rather than just celebrated. Honestly, it was the cheapest gift I've ever given, but probably the most meaningful.",
    part3Sample:
      "Personally, I think a thoughtful gift is usually better than money, because it shows that you've taken the time to understand the person. For instance, a book by someone's favourite author says much more than an envelope of cash. However, money has clear advantages in some situations. At weddings in many Asian countries, giving cash is traditional and genuinely helps young couples start their lives together. Students and young adults often prefer money too, since they can spend it on what they actually need. So I'd say it depends on the occasion and the relationship.",
    vocabulary: [
      "come up with an idea",
      "fall apart",
      "in chronological order",
      "you shouldn't have",
      "mean far more to someone",
      "go completely quiet",
      "cry in a good way",
      "a thoughtful gift",
      "sentimental rather than financial value",
      "it's the thought that counts",
    ],
  },
  {
    id: 's2-13',
    topic: 'A piece of technology you started using recently',
    prompt: "Describe a piece of technology (not a phone) that you started using recently.",
    bullets: [
      "what it is",
      "when and why you started using it",
      "how you use it",
      "and explain how it has changed your daily life.",
    ],
    part3: [
      "Does technology make people's lives simpler or more complicated?",
      "Why are older people sometimes slow to adopt new technology?",
      "Should children be taught to use technology from a young age?",
      "What jobs might disappear because of new technology?",
      "Do you think people rely too much on machines?",
    ],
    sample:
      "I'm going to talk about a smartwatch, which I started wearing about six months ago. I'd always thought they were a bit of a gimmick, to be honest, but my sister gave me one for my birthday, so I thought I'd give it a go.\n\nThe main reason she bought it was that I'd been complaining about feeling tired all the time. She works in healthcare and she suggested I start tracking my sleep and activity to see what was going on.\n\nThese days I wear it pretty much all the time, even in bed. In the morning it shows me how well I slept, and during the day it buzzes gently if I've been sitting still for too long, which, working at a desk, happens a lot. I also use it when I go running, because it tracks my distance and heart rate, so I can see whether I'm actually improving. And it's handy for little things, like checking messages without getting my phone out, or paying for a coffee with a tap of my wrist.\n\nThe biggest change has been to my sleep habits. After the first few weeks, the data made it really obvious that I was going to bed far too late and waking up several times a night. I mean, I knew I was a night owl, but seeing the numbers was a real wake-up call. So I started switching my screens off an hour before bed, and now I'm getting about an hour more sleep a night. I feel much more alert at work.\n\nThe only downside is that I sometimes get a bit obsessed with the numbers, but overall it's been genuinely useful.",
    part3Sample:
      "I'd say technology simplifies individual tasks but often makes life as a whole more complicated. Paying bills, booking tickets or finding directions now takes seconds, which is a huge improvement. For example, my parents used to queue for hours at the bank, whereas I can do everything on an app. On the other hand, we now have dozens of passwords, constant notifications and devices that need updating, and that creates a different kind of stress. So technology saves us time, but we tend to fill that time with even more digital tasks.",
    vocabulary: [
      "a gimmick",
      "give it a go",
      "track my sleep and activity",
      "be handy for",
      "with a tap of my wrist",
      "sleep habits",
      "a wake-up call",
      "switch screens off",
      "feel more alert",
      "get obsessed with",
    ],
  },
  {
    id: 's2-14',
    topic: 'Something you bought that disappointed you',
    prompt: "Describe something you bought that did not meet your expectations.",
    bullets: [
      "what you bought",
      "where and when you bought it",
      "why you were disappointed with it",
      "and explain what you did about it.",
    ],
    part3: [
      "Why do people sometimes buy things they later regret?",
      "How much influence does advertising have on what people buy?",
      "Should online sellers be punished for misleading product descriptions?",
      "Do people in your country usually complain when a product is faulty?",
      "How can consumers protect themselves when shopping online?",
    ],
    sample:
      "The thing I want to talk about is a pair of wireless earbuds that I bought online last year. They were advertised as noise-cancelling with a battery life of about thirty hours, and they were on sale for less than half the price of the well-known brands, so I thought I'd found a real bargain.\n\nI ordered them through a big shopping app during one of those midnight flash sales, which, looking back, was probably my first mistake. The product page was full of glowing five-star reviews and slick photos, and there was a countdown timer telling me the deal would end in ten minutes, so I didn't really stop to think.\n\nWhen they arrived, they looked fine, but the problems started almost immediately. The noise-cancelling barely did anything; I could still hear every conversation on the bus. The battery lasted about four hours, not thirty, and the left earbud kept disconnecting. After two weeks, the charging case stopped working altogether.\n\nSo I decided to complain. At first, the seller kept sending me copy-and-paste replies telling me to restart the device, which was incredibly frustrating. In the end, I filed a dispute through the app itself and uploaded a video showing the problem, and after about ten days I got a full refund. I also left a detailed one-star review to warn other buyers.\n\nI suppose the lesson I learned is that if something seems too good to be true, it usually is. I mean, these days I always read the negative reviews first, and I never buy anything during a flash sale unless I'd already planned to buy it.",
    part3Sample:
      "I think the main reason is impulse buying, which online shopping has made much easier. Sellers create a false sense of urgency with countdown timers and limited stock warnings, so people buy before they've thought it through. I've done this myself during late-night flash sales and regretted it the next morning. Social pressure also plays a role; people buy things because their friends or influencers have them, not because they need them. In contrast, when shopping in a physical store, you can touch the product and walk away, which gives you time to reconsider.",
    vocabulary: [
      "be on sale",
      "a flash sale",
      "glowing reviews",
      "slick photos",
      "a false sense of urgency",
      "stop working altogether",
      "file a dispute / complaint",
      "get a full refund",
      "too good to be true",
      "an impulse purchase",
    ],
  },
  {
    id: 's2-15',
    topic: 'An old object your family has kept',
    prompt: "Describe an old object that your family has kept for a long time.",
    bullets: [
      "what the object is",
      "where it came from",
      "how long your family has had it",
      "and explain why your family has kept it.",
    ],
    part3: [
      "Why do some families keep old objects for generations?",
      "Should museums be free for everyone?",
      "Is it important for young people to learn about the past?",
      "How do people in your country remember their ancestors?",
      "Will future generations value physical objects as much as we do?",
    ],
    sample:
      "The object I'd like to describe is an old wooden sewing box that belonged to my great-grandmother. It sits on a shelf in my parents' living room, and it's been in the family for at least seventy years.\n\nIt's quite small, about the size of a shoebox, and it's made of dark wood with a little brass handle on the lid. The varnish has worn off in places, and there's a crack along one side that my grandfather tried to glue back together decades ago. Inside, there are still some of her original things: a few reels of faded thread, a thimble and some handmade buttons.\n\nAccording to my grandmother, her mother was a seamstress who made clothes for half the village. Times were very hard back then, and that little box was basically how she supported her family. She mended clothes, made wedding outfits, and even taught local girls to sew, all using the tools inside it. When she passed away, the box was handed down to my grandmother, and later to my mum.\n\nI think we've kept it because it represents something important about our family history. I mean, it's a reminder of how hard our ancestors worked so that later generations could have better opportunities. Whenever my mum takes it down, she tells us stories about her grandmother, so it's a way of keeping those memories alive. It's not worth much money, obviously; a collector probably wouldn't look at it twice. But to us it's priceless, and I'm fairly sure it'll be handed down to me or my sister one day. I'd definitely never part with it.",
    part3Sample:
      "I think families keep old objects mainly because they act as a physical link to people who are no longer with us. Photos and stories fade, but an object you can touch makes the past feel real. In my family, for example, my great-grandmother's sewing box brings out stories every time someone opens it. Some people also keep heirlooms out of a sense of duty, because throwing them away would feel disrespectful. On the other hand, younger people living in small city apartments often don't have space for such things, so this tradition may become less common.",
    vocabulary: [
      "be in the family for generations",
      "the varnish has worn off",
      "a seamstress",
      "support the family",
      "be handed down to",
      "a family heirloom",
      "keep memories alive",
      "priceless",
      "part with something",
      "a physical link to the past",
    ],
  },
  /* ----------------------- Events and experiences ------------------- */
  {
    id: 's2-16',
    topic: 'A time you got lost',
    prompt: "Describe a time when you got lost.",
    bullets: [
      "where you were",
      "when it happened",
      "how you found your way",
      "and explain how you felt about the experience.",
    ],
    part3: [
      "Why do some people have a better sense of direction than others?",
      "Do you think people rely too much on GPS and map apps?",
      "What should children be taught to do if they get lost?",
      "How can cities make it easier for visitors to find their way?",
      "Is getting lost sometimes a positive experience?",
    ],
    sample:
      "I'm going to tell you about a time I got hopelessly lost in a mountain town about three years ago. I was on a solo trip, and I'd decided to walk from my guesthouse to a famous viewpoint that was supposed to be about an hour away.\n\nThe problem was that I set off quite late in the afternoon, and I was relying completely on a map app. About forty minutes into the walk, the path split into three, and of course, that was exactly the moment my phone battery died. I tried to remember which way the map had been pointing, picked the path that seemed to go uphill, and kept walking. After another half an hour, the path just disappeared into a field of tea bushes, and it was starting to get dark.\n\nI'll be honest, I started to panic a bit. There was nobody around and I had no idea which direction the town was in. Eventually, I spotted a thin line of smoke and headed towards it, and it turned out to be a small farmhouse. An elderly couple lived there, and even though we couldn't really understand each other's language, I managed to say the name of my guesthouse. The man just grinned, put on his jacket and walked me all the way back, which took nearly an hour.\n\nLooking back, I feel a mixture of embarrassment and gratitude. I mean, it was pretty foolish to go hiking without a power bank or a paper map. But the kindness of that couple completely restored my faith in strangers. Since then, I always carry a backup battery, and I actually check the route before I set off.",
    part3Sample:
      "I think it's partly natural ability and partly practice. Some people seem to have an instinctive sense of where north is, but I believe most of it comes from habit. People who grew up walking or cycling around their neighbourhoods, for example, tend to notice landmarks and remember routes. My father, who drove a delivery van for years, can find his way anywhere without a map. In contrast, people who've always relied on GPS, like many in my generation, never really develop that skill, because the phone does all the thinking for them.",
    vocabulary: [
      "get hopelessly lost",
      "set off",
      "rely completely on",
      "my phone battery died",
      "start to panic",
      "it turned out to be",
      "walk someone back",
      "a mixture of embarrassment and gratitude",
      "restore my faith in",
      "a sense of direction",
    ],
  },
  {
    id: 's2-17',
    topic: 'A celebration you enjoyed',
    prompt: "Describe a celebration or party that you really enjoyed.",
    bullets: [
      "what the celebration was",
      "when and where it took place",
      "who was there and what happened",
      "and explain why you enjoyed it so much.",
    ],
    part3: [
      "Why are celebrations important in people's lives?",
      "Have traditional festivals in your country changed in recent years?",
      "Do people spend too much money on celebrations such as weddings?",
      "Are family celebrations more meaningful than public ones?",
      "Should schools teach children about festivals from other cultures?",
    ],
    sample:
      "I'd like to talk about my parents' thirtieth wedding anniversary, which my sister and I organised as a surprise party about two years ago.\n\nIt was held in the garden of a family-run restaurant just outside our town. We'd been planning it for nearly three months, which involved a lot of secret phone calls and making excuses whenever my mum asked what we were whispering about. The trickiest part was getting my dad there without him suspecting anything, so in the end we told him we were just going for a quiet family dinner.\n\nThere were about forty guests: relatives, my parents' oldest friends, even a couple of their former neighbours who'd moved away years ago. When my parents walked in and everyone shouted 'Surprise!', my mum burst into tears, and my dad, who's normally quite reserved, just stood there with his mouth open. Later, we showed a slideshow of old photos, including some really embarrassing ones from their wedding day, and several guests gave little speeches. Then, to everyone's amazement, my dad stood up and sang the song they'd danced to at their wedding. He's a terrible singer, I have to say, but nobody cared.\n\nI think I enjoyed it so much because it brought the whole family together in a way that doesn't happen very often. I mean, we're quite spread out geographically, so it's rare to have everyone in one place. It was also really rewarding to see all that planning pay off. Seeing my parents so happy, surrounded by people who love them, is something I'll never forget. We've already started joking about what we'll do for their fortieth.",
    part3Sample:
      "I think celebrations matter because they give us a reason to pause and appreciate the people and milestones in our lives. Day-to-day life is so busy that we rarely tell family and friends how much they mean to us, and celebrations create that opportunity. My parents' anniversary party, for instance, brought together relatives who hadn't seen each other for years. Festivals also preserve cultural identity by passing traditions to younger generations. Having said that, some celebrations have become so commercial and expensive that they cause more stress than joy.",
    vocabulary: [
      "a surprise party",
      "make excuses",
      "suspect something",
      "burst into tears",
      "reserved",
      "to everyone's amazement",
      "bring the family together",
      "be spread out geographically",
      "see planning pay off",
      "mark a milestone",
    ],
  },
  {
    id: 's2-18',
    topic: 'A time you had to wait a long time',
    prompt: "Describe a time when you had to wait a long time for something.",
    bullets: [
      "what you were waiting for",
      "where you were",
      "how long you had to wait and what you did",
      "and explain how you felt while you were waiting.",
    ],
    part3: [
      "Why are people less patient nowadays than in the past?",
      "In what situations is it important to be patient?",
      "How can businesses make waiting less unpleasant for customers?",
      "Do you think technology has made people more impatient?",
      "Can patience be taught to children?",
    ],
    sample:
      "The time I'm thinking of was when my flight home was delayed for almost fourteen hours, about eighteen months ago. I was coming back from a work conference, and I was stuck at a fairly small regional airport.\n\nIt started off as a one-hour delay because of a technical problem, which was annoying but no big deal. Then it became three hours, then six, and in the end they announced the flight would leave the following morning. Because it was such a small airport, there were only a couple of cafés, and they both closed at ten o'clock at night.\n\nTo pass the time, I did everything I could think of. I finished the book I'd brought, caught up on work emails, and watched about three films on my laptop until the battery ran out and I had to queue for the one working charging point. At around two in the morning I tried to get some sleep on a row of metal chairs, using my backpack as a pillow, which, I can tell you, was not comfortable. I ended up chatting to an older couple who were waiting for the same flight, and they shared their snacks with me, which was really kind.\n\nAs for how I felt, it was a real rollercoaster. At first I was frustrated, then furious when the airline staff couldn't give us any clear information, and by the middle of the night I was just exhausted and fed up. But by the morning I'd kind of accepted it. I mean, there was nothing I could do, so getting angry wasn't going to help. It definitely taught me to always pack a power bank and some snacks.",
    part3Sample:
      "I think people are less patient mainly because we've become used to instant results. Food deliveries arrive in thirty minutes, messages are answered in seconds, and films start streaming immediately, so any delay feels unacceptable. My younger cousin, for example, gets irritated if a web page takes more than a couple of seconds to load. In the past, people had to wait weeks for a letter, so waiting was simply a normal part of life. That said, I think people can still be very patient when something really matters to them, such as recovering from an illness.",
    vocabulary: [
      "be delayed",
      "be stuck at the airport",
      "no big deal",
      "pass the time",
      "catch up on",
      "run out (of battery)",
      "an emotional rollercoaster",
      "be exhausted and fed up",
      "there was nothing I could do",
      "instant gratification",
    ],
  },
  {
    id: 's2-19',
    topic: 'A time you changed your mind',
    prompt: "Describe a time when you changed your mind about something important.",
    bullets: [
      "what the decision or opinion was",
      "when this happened",
      "what made you change your mind",
      "and explain how you feel about the change now.",
    ],
    part3: [
      "Why do some people find it hard to change their opinions?",
      "Who influences young people's decisions most: parents, friends or the media?",
      "Is it a sign of weakness or strength to change your mind?",
      "Should politicians be criticised for changing their positions?",
      "How do people make important decisions in your culture?",
    ],
    sample:
      "I'd like to talk about the time I changed my mind about what to study at university, which was just before my final year of secondary school.\n\nFor most of my teenage years, I was completely set on studying medicine. Both my parents are doctors, and I think I'd just assumed it was the natural path for me. Everyone around me kept saying what a great doctor I'd be, so I never really questioned it.\n\nWhat changed my mind was a two-week work experience placement at a local hospital. I'd expected to love it, but to be honest, I found it really draining. I admired the doctors enormously, but I realised I didn't feel any real excitement about the work itself. At the same time, the hospital was introducing a new digital records system, and I ended up spending a lot of my free time chatting to the IT team who were setting it up. I was fascinated by how they were solving problems, and by the end of the placement I was going home and teaching myself basic programming in the evenings.\n\nTelling my parents was the hardest part. I was dreading it, because I thought they'd be really disappointed. In fact, they were surprisingly supportive, although my dad did ask me several times if I was sure.\n\nLooking back now, I'm so glad I changed course. I'm working as a software developer, and funnily enough, I'm part of a team that builds software for hospitals, so I still feel connected to healthcare. I mean, if I'd just followed the expected route, I think I'd have been competent but quietly unhappy. It taught me that it's okay to step back and question plans you've made.",
    part3Sample:
      "I think the main reason is that people tie their opinions to their identity, so admitting they were wrong feels like a personal defeat. This is especially true when they've expressed their views publicly or argued strongly for them. For example, I have an uncle who refuses to accept new evidence about diet because he's spent years telling everyone the opposite. Fear of looking inconsistent also plays a part. In contrast, people who are naturally curious tend to see changing their mind as learning rather than losing, and I think that's a much healthier attitude.",
    vocabulary: [
      "be completely set on",
      "the natural path",
      "question something",
      "a work experience placement",
      "find something draining",
      "dread doing something",
      "be surprisingly supportive",
      "change course",
      "follow the expected route",
      "step back and reflect",
    ],
  },
  {
    id: 's2-20',
    topic: 'A time you received good news',
    prompt: "Describe a time when you received some good news.",
    bullets: [
      "what the news was",
      "when and how you received it",
      "who you shared it with",
      "and explain why it was good news for you.",
    ],
    part3: [
      "Why do the news media focus more on bad news than good news?",
      "How do people usually share good news in your country?",
      "Is it better to hear important news face to face or by message?",
      "Do you think people trust the news less than they used to?",
      "Should children be protected from bad news?",
    ],
    sample:
      "The good news I'm going to talk about is the day I found out I'd been awarded a scholarship for a summer course abroad. This was during my second year at university, so about three years ago.\n\nI'd applied about four months earlier, and honestly, I'd almost forgotten about it, because I was convinced I had no chance. There were only ten places for students from the whole country, and the application involved an essay, a video interview and two reference letters. The interview had gone quite badly, I thought, because I'd been so nervous that my mind went blank on one of the questions.\n\nI received the news by email at about seven in the morning. I was half asleep, scrolling through my phone in bed, and I saw the subject line saying 'Scholarship decision'. My heart was pounding as I opened it, and I had to read the first line three times before it sank in that I'd actually got it. I literally jumped out of bed and ran into the kitchen to tell my mum, who was making breakfast. She screamed so loudly that the neighbour's dog started barking. Later that day I called my grandparents, and then I posted it in my class group chat.\n\nIt was such good news for a few reasons. Financially, my family could never have afforded to send me abroad, so it was a once-in-a-lifetime opportunity. But I think more than that, it gave me a huge confidence boost. I mean, I'd always felt a bit average compared with my classmates, and this made me realise I could compete at a higher level if I really put my mind to it.",
    part3Sample:
      "I think the media focus on bad news mainly because it attracts more attention. Humans are naturally alert to danger, so stories about accidents, crime or disasters make us click and keep watching, which brings in advertising money. For example, a story about a fire will almost always get more views than one about a new community library. Bad news also tends to be more sudden and dramatic, while good news, like falling poverty rates, happens slowly. That said, some outlets now deliberately include positive stories, because audiences are becoming tired of constant negativity.",
    vocabulary: [
      "be awarded a scholarship",
      "be convinced I had no chance",
      "my mind went blank",
      "my heart was pounding",
      "it finally sank in",
      "jump out of bed",
      "a once-in-a-lifetime opportunity",
      "a confidence boost",
      "put my mind to it",
      "compete at a higher level",
    ],
  },
  {
    id: 's2-21',
    topic: 'A time you helped a stranger',
    prompt: "Describe a time when you helped someone you did not know.",
    bullets: [
      "who the person was",
      "where and when it happened",
      "how you helped them",
      "and explain how you felt after helping them.",
    ],
    part3: [
      "Why are some people unwilling to help strangers?",
      "Are people in cities less helpful than people in the countryside?",
      "Should people be rewarded for helping others?",
      "How can parents teach children to be kind?",
      "Do you think technology makes it easier or harder to help others?",
    ],
    sample:
      "I'd like to describe a time I helped an elderly man at a train station last winter. I was on my way to visit a friend in another city, and I was killing time on the platform because my train was running a bit late.\n\nI noticed this man, who must've been in his eighties, standing in front of the ticket machine looking really confused. He kept pressing buttons, the screen kept going back to the beginning, and the queue behind him was getting longer and longer. A few people were sighing and muttering, which I thought was pretty unkind, to be honest.\n\nSo I went over and asked if he needed a hand. It turned out he was trying to buy a ticket to visit his daughter, but the station had recently got rid of the ticket counter, and he'd never used one of these machines before. He didn't have a bank card either, only cash, and the machine wasn't accepting his notes. In the end, I paid for his ticket with my card, and he insisted on giving me the cash. Then, because he was a bit unsteady on his feet, I helped him find the right platform and waited with him until his train arrived.\n\nAfterwards, I felt really good, but also a bit uneasy. I mean, I was happy I'd been able to help, and he was so grateful that he shook my hand about five times. But it made me think about how many older people must be left behind when everything goes digital. If I hadn't been there, he might have missed his train completely. Since then, I've tried to keep an eye out for people who look lost in situations like that.",
    part3Sample:
      "I think a major reason is fear: people worry about being tricked or getting involved in something risky. There are many stories online about scams where someone pretends to need help, so people become suspicious. Another factor is the so-called bystander effect; in a crowd, everyone assumes someone else will step in. I've seen this myself when someone fell on a busy street and dozens of people just walked past. In smaller communities, however, people tend to know each other, so they feel more responsible and are much quicker to help.",
    vocabulary: [
      "kill time",
      "run late",
      "need a hand",
      "get rid of something",
      "be unsteady on your feet",
      "insist on doing something",
      "be left behind",
      "keep an eye out for",
      "the bystander effect",
      "step in to help",
    ],
  },
  /* ---------------------------- Activities -------------------------- */
  {
    id: 's2-22',
    topic: 'A skill you learned outside school',
    prompt: "Describe a skill you learned outside school or university.",
    bullets: [
      "what the skill is",
      "when and how you learned it",
      "how difficult it was to learn",
      "and explain how this skill has helped you.",
    ],
    part3: [
      "Is it better to learn skills from a teacher or by yourself?",
      "What skills do employers value most nowadays?",
      "Why do adults often find it harder to learn new skills than children?",
      "Should schools teach more practical skills?",
      "How has the internet changed the way people learn?",
    ],
    sample:
      "The skill I want to talk about is swimming. It might sound strange, but I didn't learn to swim until I was twenty-two, which is quite late.\n\nWhen I was a kid, my family lived far from any pool, and my parents were quite nervous around water, so it just never happened. For years I was a bit embarrassed about it; whenever friends went to the beach, I'd make excuses or just paddle at the edge. Then, about four years ago, a friend of mine nearly got into trouble in the sea, and it really shook me up. I realised that if something had happened, I wouldn't have been able to help at all. So I signed up for adult beginner classes at a public pool near my office.\n\nHonestly, it was much harder than I'd expected. The physical side wasn't too bad, but the mental side was tough. I had to get over a real fear of putting my face in the water, and for the first few weeks I kept panicking and grabbing the side of the pool. The instructor was incredibly patient, though. She broke everything down into tiny steps, like breathing out under water, then floating, then kicking. After about three months, I could swim a full length without stopping, and I was ridiculously proud of myself.\n\nIt's helped me in more ways than I expected. Obviously, I feel safer around water, and I can finally join my friends at the beach. But it's also become my favourite way to exercise; I swim twice a week now. I mean, more than anything, it proved to me that it's never too late to learn something, as long as you're willing to feel a bit silly at first.",
    part3Sample:
      "In my opinion, having a good teacher is usually more effective, especially at the beginning, because they can spot mistakes you don't notice and keep you motivated. When I learned to swim, for example, my instructor corrected my breathing in a way no video could have done. However, teaching yourself has real advantages too. It's cheaper, more flexible, and it builds independence and problem-solving skills. Many programmers, for instance, are largely self-taught. So I'd say the best approach is a combination: a teacher for the basics, then independent practice.",
    vocabulary: [
      "never got round to it",
      "shake someone up",
      "sign up for",
      "get over a fear",
      "break something down into steps",
      "be ridiculously proud",
      "in more ways than one",
      "it's never too late to",
      "self-taught",
      "a steep learning curve",
    ],
  },
  {
    id: 's2-23',
    topic: 'An outdoor activity you would like to try',
    prompt: "Describe an outdoor activity that you have never done but would like to try.",
    bullets: [
      "what the activity is",
      "where you would do it",
      "who you would do it with",
      "and explain why you would like to try it.",
    ],
    part3: [
      "Why do some people enjoy dangerous sports?",
      "Do young people spend less time outdoors than in the past?",
      "Should schools organise more outdoor activities for students?",
      "What are the benefits of spending time in nature?",
      "Should the government spend money on parks and outdoor facilities?",
    ],
    sample:
      "An activity I've always wanted to try is rock climbing, and I mean proper climbing on real cliffs, not just an indoor climbing wall.\n\nThere's a well-known climbing area a few hours north of my city, on a stretch of limestone mountains overlooking the sea. I've seen loads of photos of it on social media, and there are a few companies there that run beginner courses with qualified guides, so that's where I'd go. I definitely wouldn't attempt it without someone experienced, because I've got absolutely no idea about ropes or safety equipment.\n\nI'd probably do it with my cousin, who's a really outdoorsy person. She's been talking about it for ages too, and she's the kind of person who'd push me when I wanted to give up halfway up a cliff. We've talked about making it a long-weekend trip, maybe staying in a small guesthouse and combining it with some swimming and kayaking.\n\nAs for why I want to try it, there are a few reasons. First, I spend almost all of my working day sitting in front of a computer, and I really miss doing something physical that challenges my whole body. Climbing looks like it builds strength, but also requires a lot of focus and problem-solving, which appeals to me. Second, I'm actually a little scared of heights, so I think it'd be a good way to push myself out of my comfort zone. I mean, people always say the view from the top is incredible, and that sense of achievement must be amazing. And finally, it's a great excuse to get out of the city and spend time somewhere really beautiful. I'm hoping to finally do it next spring.",
    part3Sample:
      "I think people enjoy dangerous sports mainly because of the adrenaline rush. Doing something risky floods the body with excitement, and many people find that incredibly addictive. A friend of mine who goes skydiving says it's the only time her mind is completely free of everyday worries. There's also the satisfaction of overcoming fear and proving something to yourself. On the other hand, some people simply have a very different attitude to risk; for them, the danger is a big turn-off, and they'd much rather get their excitement from a good film or book.",
    vocabulary: [
      "rock climbing",
      "a qualified guide",
      "outdoorsy",
      "give up halfway",
      "be scared of heights",
      "push yourself out of your comfort zone",
      "a sense of achievement",
      "get out of the city",
      "an adrenaline rush",
      "a turn-off",
    ],
  },
  {
    id: 's2-24',
    topic: 'A team project you took part in',
    prompt: "Describe a time when you worked in a team to complete a project.",
    bullets: [
      "what the project was",
      "who you worked with",
      "what your role was",
      "and explain how you felt about working in this team.",
    ],
    part3: [
      "What are the advantages of working in a team rather than alone?",
      "What makes a good team leader?",
      "Why do conflicts sometimes happen in teams?",
      "Should schools give more group assignments?",
      "Will remote working make teamwork more difficult in the future?",
    ],
    sample:
      "The project I'd like to describe was a short documentary film that I made with four classmates during my second year at university. It was for a media studies course, and the brief was to make a ten-minute film about an issue affecting our city.\n\nWe chose to make it about street vendors and how new regulations were forcing many of them off the pavements. There were five of us: two people who were really good with cameras, a guy who was brilliant at editing, a girl who'd done some journalism, and me. I ended up as a kind of coordinator, which basically meant organising the schedule, arranging interviews and making sure we actually met our deadlines.\n\nIt wasn't always smooth sailing, I have to say. About halfway through, two of the team had a big disagreement about the direction of the film. One wanted it to be quite political, the other wanted to focus on the personal stories of the vendors. There was a really tense meeting where nobody was speaking to each other. In the end, I suggested we interview a couple more vendors and let their stories decide the tone, and that helped clear the air.\n\nOverall, I felt really positive about the experience. I learned that I'm actually quite good at keeping people on track, which I hadn't realised before. And I also learned that conflict isn't necessarily a bad thing, as long as it's handled well. I mean, the final film was far better because of the different viewpoints. We got one of the highest grades in the class, and one of the vendors even asked for a copy to show her family.",
    part3Sample:
      "The biggest advantage, I think, is that a team brings together different skills and perspectives, which usually leads to better results. One person rarely has every ability a project needs. In my university film project, for example, we had people who were good at filming, editing and interviewing, and none of us could have done it all alone. Teams also share the workload and offer emotional support under pressure. However, working alone can be more efficient for simple tasks, because you avoid long discussions and can make decisions quickly.",
    vocabulary: [
      "the brief was to",
      "meet a deadline",
      "a coordinator",
      "not always smooth sailing",
      "have a big disagreement",
      "a tense meeting",
      "clear the air",
      "keep people on track",
      "share the workload",
      "bring different perspectives together",
    ],
  },
  {
    id: 's2-25',
    topic: 'A healthy habit you have',
    prompt: "Describe a healthy habit that you have.",
    bullets: [
      "what the habit is",
      "when you started it",
      "how often you do it",
      "and explain how it has affected your health.",
    ],
    part3: [
      "Why do many people find it hard to keep healthy habits?",
      "Should governments tax unhealthy food and drinks?",
      "Are people today healthier than people in the past?",
      "What role should schools play in children's health?",
      "Is mental health as important as physical health?",
    ],
    sample:
      "A healthy habit I've managed to stick to is going for a walk every evening after dinner. It sounds really simple, but it's made a bigger difference to my life than any diet or gym membership I've tried.\n\nI started about two years ago, during a period when I was working from home full-time. I realised that some days I was taking fewer than a thousand steps, because I'd just move from my bed to my desk to the sofa. I was also sleeping badly and getting back pain, so my doctor suggested I build more movement into my day. I didn't think I'd keep it up, honestly, because I've given up on so many exercise plans in the past.\n\nThese days I go almost every evening, unless it's pouring with rain. I usually walk for about forty minutes around a lake near my apartment. Sometimes I listen to a podcast, sometimes I call my parents, and sometimes I just enjoy the quiet. At weekends my flatmate often comes along, and we'll go a bit further.\n\nThe effects have been pretty noticeable. Physically, my back pain has more or less disappeared, and I've lost a few kilos without really trying. I also find it much easier to fall asleep, because walking after a meal seems to help my digestion and calm me down. But I think the biggest benefit has been mental. I mean, it's become a sort of buffer between work and the rest of my evening, so I don't carry stress into the night. The key, I think, is that it's so easy that I've never had an excuse to skip it.",
    part3Sample:
      "I'd say the main problem is that healthy habits require effort now, while the rewards only come much later. Eating fast food or skipping exercise feels better in the moment, so it's easy to give in. For instance, many of my colleagues sign up for the gym in January but stop going within a few weeks, because they don't see results quickly enough. Busy schedules and stress also make it harder. In contrast, people who start with very small, easy changes, like a short daily walk, are far more likely to stick with them.",
    vocabulary: [
      "stick to a habit",
      "build movement into my day",
      "keep it up",
      "give up on something",
      "pour with rain",
      "more or less disappeared",
      "lose a few kilos",
      "help my digestion",
      "a buffer between work and home",
      "skip a session",
    ],
  },
  {
    id: 's2-26',
    topic: 'A game you enjoyed as a child',
    prompt: "Describe a game you enjoyed playing when you were a child.",
    bullets: [
      "what the game was",
      "who you played it with",
      "where and how you played it",
      "and explain why you enjoyed playing it.",
    ],
    part3: [
      "How are children's games today different from those in the past?",
      "Are video games harmful or beneficial for children?",
      "Why is play important for children's development?",
      "Should parents limit the time children spend playing games online?",
      "Do adults also need to play?",
    ],
    sample:
      "The game I want to talk about is a sort of hide-and-seek that we used to play in my grandparents' neighbourhood when I was about seven or eight.\n\nEvery summer holiday, my parents sent me to stay with my grandparents for a month, and there was a big group of kids living on the same lane, ranging from about five to twelve years old. Most evenings, once the heat of the day had died down, we'd all gather under a huge old tree at the end of the lane and play until it got dark.\n\nThe rules were a bit different from normal hide-and-seek. One person was the seeker and had to count to fifty with their eyes closed against the tree, while everyone else hid. But instead of just finding people, the seeker had to race them back to the tree and touch it first. If one of the hiders got back first, they could 'free' anyone who'd already been caught. So it involved a lot of sneaking around, sprinting and screaming. The best hiding places were behind the water tanks, in the bamboo bushes, or, if you were brave, in a neighbour's chicken shed, which smelled terrible.\n\nI loved it because it was pure freedom. I mean, back home in the city I wasn't allowed to play outside without an adult, but there, we were left completely to our own devices. It was also where I made my first real friends, and I'm actually still in touch with two of them. Looking back, I think those evenings taught me a lot about fairness and teamwork without me even realising it. Kids today rarely get that kind of unsupervised play, which is a bit sad.",
    part3Sample:
      "The biggest difference, I'd say, is that games have moved from outdoors to screens. In the past, children made up their own games with whatever was around, like sticks and stones, and played in large mixed-age groups in the street. My childhood evenings playing hide-and-seek are a good example. Nowadays, many children play video games, often alone or with friends online. That's not entirely negative, because some games develop problem-solving and teamwork. But I think kids today get less physical exercise and fewer chances to sort out disagreements face to face.",
    vocabulary: [
      "used to / would (past habits)",
      "the heat of the day died down",
      "sneak around",
      "be left to your own devices",
      "pure freedom",
      "keep in touch",
      "unsupervised play",
      "make up a game",
      "mixed-age groups",
      "sort out a disagreement",
    ],
  },
  /* ------------------------------ Media ----------------------------- */
  {
    id: 's2-27',
    topic: 'A book that made you think',
    prompt: "Describe a book you have read that made you think differently about something.",
    bullets: [
      "what the book was",
      "when and why you read it",
      "what it was about",
      "and explain how it changed your thinking.",
    ],
    part3: [
      "Do you think people read less than they used to?",
      "What are the benefits of reading fiction compared with non-fiction?",
      "Should schools make students read classic literature?",
      "Will printed books disappear in the future?",
      "How can parents encourage children to read more?",
    ],
    sample:
      "The book I'd like to talk about is a non-fiction book about habits, written by a psychologist. I won't try to remember the exact title, but it's basically about why we do things automatically and how small changes can add up over time.\n\nI read it about two years ago, during a period when I was feeling pretty frustrated with myself. I'd made loads of big resolutions, like getting up at five every day, studying for three hours each evening and going to the gym daily, and I'd failed at all of them within a couple of weeks. A friend lent me the book and said it might help, so I read it on my commute over about a month.\n\nThe main idea is that most of our behaviour isn't driven by willpower but by our environment and routines. The author explains that if you want to change a habit, you should make it so easy that it's almost impossible to fail, and attach it to something you already do. For example, instead of promising to read for an hour, you promise to read one page after you brush your teeth.\n\nIt really changed the way I see myself. I mean, before that I genuinely thought I was just a lazy person with no self-discipline. The book made me realise that I'd simply been setting myself up to fail with unrealistic goals. So I started small: ten minutes of English vocabulary every morning with my coffee, a short walk after dinner. Two years on, I've kept most of them up, and the vocabulary habit is actually one of the reasons I'm preparing for this exam now.",
    part3Sample:
      "I don't think people necessarily read less, but they definitely read differently. Instead of long novels, many people now read short articles, social media posts and online news, often on their phones. My younger brother, for instance, rarely picks up a book, yet he reads for hours every day, mostly forum discussions and online articles. What has declined, I'd say, is deep, focused reading, because constant notifications make it hard to concentrate. On the other hand, audiobooks and e-readers have actually brought some people back to books, especially busy commuters.",
    vocabulary: [
      "non-fiction",
      "add up over time",
      "make a resolution",
      "be driven by willpower",
      "change the way I see myself",
      "self-discipline",
      "set yourself up to fail",
      "start small",
      "keep a habit up",
      "deep, focused reading",
    ],
  },
  {
    id: 's2-28',
    topic: 'A website or app you use often',
    prompt: "Describe a website or app that you use often.",
    bullets: [
      "what it is",
      "how you found out about it",
      "what you use it for",
      "and explain why you find it useful.",
    ],
    part3: [
      "How has the internet changed the way people learn?",
      "Do you think people share too much personal information online?",
      "Should children's use of apps be controlled by parents?",
      "Why do some apps become popular so quickly?",
      "What are the dangers of relying on online information?",
    ],
    sample:
      "The app I use most often, apart from messaging apps, is a language-learning app that I've been using every day for almost two years now.\n\nI actually found out about it from a coworker. We were having lunch, and she suddenly pulled out her phone and said she had to do her lesson or she'd lose her streak, which is the number of days in a row you've practised. I thought it was a bit funny at first, but she showed me how it worked, and I downloaded it that evening.\n\nI mainly use it to practise English, though I've also started dabbling in Japanese just for fun. Each lesson takes about ten or fifteen minutes, and it mixes listening, speaking, and matching words with pictures. I normally do it on the bus on my way to work, and sometimes again before bed. There's also a feature where you can compete with other users in a weekly league, which, I have to admit, makes me quite competitive.\n\nI find it really useful because it fits so easily into my day. I mean, I'd love to sit down and study for an hour every evening, but realistically, after work I'm usually too tired. With the app, those little gaps in my day, like waiting for a bus or queuing for coffee, become study time. It's also very motivating, because you can see your progress clearly. That said, I know it's not enough on its own; it's great for vocabulary, but it doesn't really help with speaking fluently or writing essays. So I see it as a supplement to proper study rather than a replacement.",
    part3Sample:
      "I think the internet has made learning far more accessible and flexible. Anyone with a phone can now watch lectures from top universities, learn a language or follow a coding tutorial for free, at their own pace. A friend of mine, for example, taught herself graphic design entirely through online videos and now works as a freelancer. However, there are downsides. Because there's so much information, it's easy to jump from topic to topic without learning anything deeply, and not all sources are reliable. So the internet is a powerful tool, but it requires self-discipline.",
    vocabulary: [
      "lose your streak",
      "in a row",
      "dabble in something",
      "fit into my day",
      "realistically",
      "little gaps in my day",
      "see your progress",
      "a supplement rather than a replacement",
      "at your own pace",
      "accessible and flexible",
    ],
  },
  {
    id: 's2-29',
    topic: 'A documentary you learned something from',
    prompt: "Describe a documentary or TV programme that taught you something interesting.",
    bullets: [
      "what it was called or what it was about",
      "when and where you watched it",
      "what you learned from it",
      "and explain why you found it interesting.",
    ],
    part3: [
      "Why are documentaries becoming more popular?",
      "Is television still an important source of information?",
      "Should the government fund educational TV programmes?",
      "Can documentaries change people's behaviour?",
      "Do you think the media present science accurately?",
    ],
    sample:
      "I'd like to talk about a documentary series about the ocean that I watched on a streaming platform a few months ago. I'm not sure of the exact title, but it was a series of six episodes, each one focusing on a different part of the sea, from coral reefs to the deep ocean.\n\nI watched it at home over a couple of weekends, mostly with my flatmate. To be honest, I only started it because I'd run out of things to watch, but after the first episode we were completely hooked, and we ended up watching the last three episodes in one go.\n\nThe part that really stuck with me was the episode about the deep sea. I'd always assumed that the bottom of the ocean was basically empty and lifeless, because there's no sunlight down there. But it turns out it's full of the most bizarre creatures, like fish that produce their own light and animals that live near underwater volcanoes. The documentary also explained that we've actually mapped the surface of the Moon in more detail than our own ocean floor, which completely blew my mind.\n\nI found it so interesting partly because of the visuals; the filming was absolutely stunning. But I think it was mainly because it made me realise how little we actually know about our own planet. I mean, we talk about exploring space, and yet there's this huge unexplored world right here. The final episode was about plastic pollution, and it was really sobering. Since watching it, I've made more of an effort to avoid single-use plastics, so I'd say it actually changed my behaviour a little, too.",
    part3Sample:
      "I think documentaries are becoming more popular mainly because streaming platforms have made them so easy to access, and the production quality is now as high as any feature film. People also seem hungry for real stories in a world full of fake news. For example, true-crime documentaries attract millions of viewers who enjoy trying to solve mysteries alongside the presenter. Another reason is that they let us learn without feeling like we're studying. However, some documentaries exaggerate or oversimplify issues to be more dramatic, so viewers still need to think critically.",
    vocabulary: [
      "a documentary series",
      "run out of things to watch",
      "be completely hooked",
      "watch in one go / binge-watch",
      "stick with someone",
      "it turns out",
      "blow someone's mind",
      "absolutely stunning visuals",
      "sobering",
      "make more of an effort",
    ],
  },
  {
    id: 's2-30',
    topic: 'An advertisement you remember',
    prompt: "Describe an advertisement that you remember well.",
    bullets: [
      "what product or service it advertised",
      "where you saw or heard it",
      "what happened in the advertisement",
      "and explain why you remember it so well.",
    ],
    part3: [
      "Why are some advertisements more memorable than others?",
      "Should advertising aimed at children be banned?",
      "Do you think social media influencers are a form of advertising?",
      "How has advertising changed in the past twenty years?",
      "Do people believe what they see in advertisements?",
    ],
    sample:
      "The advertisement I'm going to describe was for a bank, which sounds really dull, but it was actually one of the most moving adverts I've ever seen. I first saw it on a video site about a year ago, just before Lunar New Year, and it ended up going viral.\n\nThe advert followed an elderly man who lives alone in the countryside. At the start, you see him trying to learn how to use a smartphone, failing again and again, and getting frustrated. Then you see him secretly practising every evening, writing notes on scraps of paper and asking a teenager in his village for help. In the final scene, it's New Year's Eve, his children and grandchildren are in the city, too busy to come home, and suddenly their phones ring. It's him, on a video call, proudly showing them the meal he's prepared, and they all just burst into tears. The bank's name only appeared for about two seconds at the end, with a short message about staying connected.\n\nI think I remember it so well for a couple of reasons. First, it didn't feel like an advert at all; it was more like a short film. There was no hard sell, no prices, and the product was barely mentioned. Second, it hit very close to home. I mean, I live in a different city from my grandparents, and I don't visit as often as I should, so it made me feel quite guilty, to be honest. In fact, I called my grandmother straight after watching it. Looking back, it's quite clever, because I can't remember any other bank adverts, but I still remember that one.",
    part3Sample:
      "In my view, the most memorable adverts are the ones that make us feel something, rather than simply listing a product's features. When an advert tells a story that touches our emotions, whether it's humour, nostalgia or sadness, it sticks in our minds. For example, I still remember a bank advert about an old man learning to video-call his family, yet I've forgotten countless ads that just showed prices. Catchy music and repetition also help. On the other hand, adverts that are too strange or shocking might be remembered, but people may forget which brand they were for.",
    vocabulary: [
      "a moving advert",
      "go viral",
      "a hard sell",
      "hit close to home",
      "burst into tears",
      "stay connected",
      "stick in your mind",
      "a catchy tune / jingle",
      "tug at the heartstrings",
      "target audience",
    ],
  },
];
