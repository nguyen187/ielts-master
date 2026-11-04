import type { ReadingPassage } from '../types';

export const readingB: ReadingPassage[] = [
  /* ================================================================== */
  /* r07 — Vertical farming (Academic, difficulty 1)                     */
  /* ================================================================== */
  {
    id: 'r07',
    module: 'academic',
    difficulty: 1,
    title: 'Growing Up: The Promise of Vertical Farming',
    subtitle: 'Can stacking crops indoors help to feed the cities of the future?',
    topic: 'agriculture',
    minutes: 20,
    paragraphs: [
      {
        label: 'A',
        text: "In a converted warehouse on the edge of a northern European city, lettuces grow in trays stacked twelve levels high. There is no soil and no sunlight. Instead, the plants' roots hang in a thin film of nutrient-rich water, and their leaves are bathed in the pinkish glow of light-emitting diodes, or LEDs. Workers in hairnets and overshoes move between the racks on mechanical lifts, checking the crops and recording their growth. This is vertical farming, an approach to agriculture that its supporters believe could transform the way cities are fed, and that its critics regard as an expensive solution to a problem that may not exist.",
      },
      {
        label: 'B',
        text: 'The basic idea is not new. Growing plants indoors under artificial conditions has been practised for centuries, from the heated orangeries of wealthy European estates to the vast greenhouses that now cover large parts of southern Spain and the Netherlands. What distinguishes vertical farming is its use of height rather than area. By stacking crops in layers inside a fully enclosed building, growers can, in theory, produce many times more food per square metre of land than a conventional field. The concept was popularised in the early 2000s by an American professor of public health, who challenged his students to design a skyscraper capable of feeding an entire neighbourhood.',
      },
      {
        label: 'C',
        text: 'Supporters point to several advantages. Because conditions inside the building are controlled precisely, crops can be harvested all year round, regardless of droughts, floods or frosts outside. Pests find it difficult to enter a sealed growing room, so pesticides are rarely needed. Water use is also remarkably low: most systems recirculate the same water, topping it up only to replace what the plants absorb, and operators commonly claim to use around 95 per cent less water than field farming. Finally, a farm located inside a city can deliver produce to shops within hours of harvest, reducing both transport emissions and the amount of food that spoils on the way. Because the crops are grown so close to where they are eaten, they can also be picked when fully ripe rather than several days in advance.',
      },
      {
        label: 'D',
        text: 'The greatest obstacle, however, is energy. In a field, sunlight is free; in a vertical farm, every unit of light that reaches a leaf must be paid for. Lighting typically accounts for the largest share of a farm\'s running costs, followed by the heating, cooling and dehumidifying systems needed to keep the air at exactly the right temperature and humidity. When electricity prices rose sharply in Europe in 2022, several well-funded vertical farming companies were forced to close or to reduce production, and investors, who had previously been enthusiastic, became noticeably more cautious.',
      },
      {
        label: 'E',
        text: 'This economic reality explains why vertical farms grow such a narrow range of crops. Leafy greens such as lettuce, spinach and basil are ideal: they grow quickly, they consist mostly of water, and almost the entire plant can be sold. Staple crops are a different matter. A wheat plant devotes much of its energy to stalks and roots that have little market value, and it takes months to mature. One researcher has calculated that a loaf of bread made from vertically farmed wheat would cost many times the price of an ordinary loaf. Root vegetables such as potatoes and carrots present similar difficulties, since they need deep containers and long growing periods. For the foreseeable future, then, vertical farms are unlikely to replace the fields that produce the world\'s grains.',
      },
      {
        label: 'F',
        text: 'Engineers are working hard to close the gap. LEDs have become steadily more efficient, and growers have learned that plants do not need the full spectrum of sunlight; red and blue wavelengths, which plants absorb most readily, are often enough. Some farms now adjust the intensity of their lights hour by hour, buying electricity when it is cheapest, while others are experimenting with robots that move trays automatically and cameras that can detect disease before a human could notice it. A few operators have built their farms next to solar or wind installations in order to secure a cheaper and cleaner supply of power.',
      },
      {
        label: 'G',
        text: 'Whether vertical farming becomes a major part of the food system will probably depend less on the technology itself than on how it is combined with other approaches. Some experts see a future in which vertical farms supply the most perishable products to city dwellers, while traditional farms continue to grow the bulk of the calories that people consume. Others argue that the same investment would achieve more if it were spent on improving existing greenhouses, which already use sunlight and are far cheaper to build. What seems clear is that the lettuce in the warehouse is not, on its own, the answer to feeding a growing global population.',
      },
    ],
    groups: [
      {
        id: 'r07-g1',
        type: 'matching',
        instructions:
          'Reading Passage has seven paragraphs, A–G. Choose the correct heading for paragraphs B–G from the list of headings below. Write the correct number, i–ix. There are more headings than paragraphs, so you will not use them all.',
        title: 'List of Headings',
        options: [
          { key: 'i', text: 'Innovations aimed at lowering costs' },
          { key: 'ii', text: 'Government support for urban agriculture' },
          { key: 'iii', text: 'An old practice with a new dimension' },
          { key: 'iv', text: 'A place alongside, not instead of, traditional farming' },
          { key: 'v', text: 'The benefits claimed by supporters' },
          { key: 'vi', text: 'Consumer doubts about indoor produce' },
          { key: 'vii', text: 'Why only certain crops make economic sense' },
          { key: 'viii', text: 'The problem of paying for light and climate' },
          { key: 'ix', text: 'The decline of the greenhouse industry' },
        ],
        questions: [
          {
            id: 'r07-q1',
            number: 1,
            prompt: 'Paragraph B',
            answer: ['iii'],
            explanation:
              "B says indoor growing 'has been practised for centuries' (an old practice) but vertical farming is distinguished by 'its use of height rather than area' (a new dimension). Heading ix is a trap: greenhouses are mentioned only as an example, not as declining.",
          },
          {
            id: 'r07-q2',
            number: 2,
            prompt: 'Paragraph C',
            answer: ['v'],
            explanation:
              "C opens 'Supporters point to several advantages' and lists year-round harvests, few pesticides, low water use and short delivery times. Heading i is a trap: these are advantages of the method, not innovations to cut costs.",
          },
          {
            id: 'r07-q3',
            number: 3,
            prompt: 'Paragraph D',
            answer: ['viii'],
            explanation:
              "D says 'The greatest obstacle ... is energy': lighting is the largest running cost, 'followed by the heating, cooling and dehumidifying systems' (climate). Do not choose ii: governments are never mentioned; the 2022 example concerns companies and investors.",
          },
          {
            id: 'r07-q4',
            number: 4,
            prompt: 'Paragraph E',
            answer: ['vii'],
            explanation:
              "E explains 'why vertical farms grow such a narrow range of crops': leafy greens are profitable, while wheat 'would cost many times the price of an ordinary loaf'. Heading vi is a trap: the issue is cost, not consumers' opinions.",
          },
          {
            id: 'r07-q5',
            number: 5,
            prompt: 'Paragraph F',
            answer: ['i'],
            explanation:
              "F describes efforts 'to close the gap': more efficient LEDs, buying electricity 'when it is cheapest', robots, cameras and solar or wind power for a 'cheaper ... supply'. Heading viii also mentions light, but F is about solutions, not the problem itself.",
          },
          {
            id: 'r07-q6',
            number: 6,
            prompt: 'Paragraph G',
            answer: ['iv'],
            explanation:
              "G predicts vertical farms supplying perishable products 'while traditional farms continue to grow the bulk of the calories', so they complement rather than replace fields. Heading ix is a trap: greenhouses are presented as a cheaper alternative, not as declining.",
          },
        ],
      },
      {
        id: 'r07-g2',
        type: 'tfng',
        instructions:
          'Do the following statements agree with the information given in Reading Passage? Write TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this.',
        questions: [
          {
            id: 'r07-q7',
            number: 7,
            prompt: 'The lettuces in the warehouse described at the start of the passage are grown without soil.',
            answer: ['TRUE'],
            explanation:
              "Paragraph A states 'There is no soil and no sunlight' and the roots 'hang in a thin film of nutrient-rich water'. The statement simply paraphrases this.",
          },
          {
            id: 'r07-q8',
            number: 8,
            prompt: 'The academic who popularised vertical farming was a professor of agriculture.',
            answer: ['FALSE'],
            explanation:
              "Paragraph B says the concept was popularised by 'an American professor of public health', which contradicts 'agriculture'. The trap is assuming that a farming idea must come from a farming expert.",
          },
          {
            id: 'r07-q9',
            number: 9,
            prompt: 'Some European vertical farming companies received financial help from governments during the 2022 rise in electricity prices.',
            answer: ['NOT GIVEN'],
            explanation:
              "Paragraph D says companies 'were forced to close or to reduce production' and investors became cautious, but governments and financial help are never mentioned. Do not guess from general knowledge of the energy crisis.",
          },
          {
            id: 'r07-q10',
            number: 10,
            prompt: 'In most vertical farms, lighting costs less than controlling the temperature and humidity of the air.',
            answer: ['FALSE'],
            explanation:
              "Paragraph D says lighting 'typically accounts for the largest share of a farm's running costs, followed by' the heating, cooling and dehumidifying systems, so lighting costs more, not less.",
          },
        ],
      },
      {
        id: 'r07-g3',
        type: 'gap',
        instructions: 'Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.',
        title: 'Crops and costs in vertical farming',
        questions: [
          {
            id: 'r07-q11',
            number: 11,
            prompt:
              'Leafy greens are the most suitable crops for vertical farms because they grow fast, are mostly water and nearly all of the plant can be ____.',
            answer: ['sold'],
            explanation:
              "Paragraph E: 'almost the entire plant can be sold'. 'Water' is a trap because it is already used earlier in the sentence.",
          },
          {
            id: 'r07-q12',
            number: 12,
            prompt:
              'Wheat is much less suitable, partly because a large part of the plant has little market value and it needs ____ to mature.',
            answer: ['months'],
            explanation:
              "Paragraph E: wheat 'takes months to mature'. The answer must be one word, so 'many times' (about the price of bread) does not fit the meaning or the limit.",
          },
          {
            id: 'r07-q13',
            number: 13,
            prompt:
              'To save energy, growers have found that plants can manage with only ____ and blue light rather than the full spectrum of sunlight.',
            answer: ['red'],
            explanation:
              "Paragraph F: 'red and blue wavelengths, which plants absorb most readily, are often enough'. 'Pinkish' in paragraph A describes the glow of the lights, not the wavelengths plants need.",
          },
        ],
      },
    ],
  },

  /* ================================================================== */
  /* r08 — The psychology of queuing (Academic, difficulty 2)            */
  /* ================================================================== */
  {
    id: 'r08',
    module: 'academic',
    difficulty: 2,
    title: 'Waiting in Line',
    subtitle: 'Why some queues feel longer than others',
    topic: 'psychology',
    minutes: 20,
    paragraphs: [
      {
        label: 'A',
        text: 'Every year, the average city dweller spends a surprising amount of time waiting: for buses, at supermarket checkouts, on the telephone to call centres and in the security halls of airports. Estimates vary, but surveys in several countries suggest that the total may exceed a full working week annually. Yet the frustration people feel while waiting is only loosely connected to how long they actually wait. A growing body of research indicates that the experience of a queue depends at least as much on what happens in the mind as on what the clock records.',
      },
      {
        label: 'B',
        text: 'The mathematical study of queues began in the early twentieth century, when a Danish engineer working for a telephone company tried to calculate how many operators were needed to handle incoming calls without leaving customers on hold for too long. His equations, which treated callers as arriving at random, became the foundation of a field now known as queuing theory. For decades, organisations applied these models with a single aim: to reduce average waiting time. By the middle of the century, the same methods were being used to plan everything from bank counters to factory production lines and road junctions. It was only in the 1980s that researchers began to ask why two queues of identical length could produce very different levels of customer irritation.',
      },
      {
        label: 'C',
        text: "One of the clearest answers concerns the difference between occupied and unoccupied time. Dr Helen Marsh, who studies service operations, describes a hotel whose guests complained constantly about slow lifts. Rather than install faster machinery, which would have been extremely costly, the management placed mirrors beside the lift doors. Complaints fell almost immediately, even though the waiting time was unchanged. According to Marsh, guests who could check their appearance or watch other people simply did not notice the minutes passing in the same way. 'Idle time feels longer than busy time,' she says. 'Give people something to do, and the wait shrinks in their minds.'",
      },
      {
        label: 'D',
        text: 'Uncertainty has a similar effect. Professor Tomas Reyes, a psychologist, has conducted experiments in which participants waited for a task to begin. Those who were told in advance how long the delay would last reported far less anxiety than those who were left to guess, even when the informed group actually waited longer. Reyes argues that an unexplained wait is particularly damaging, because people tend to imagine the worst: that they have been forgotten, or that something has gone wrong. This is why many transport operators now display the expected arrival time of the next train, and why theme parks post estimated waiting times at the entrance to each ride. Interestingly, some parks deliberately overstate these estimates, so that visitors are pleasantly surprised when they reach the front sooner than expected.',
      },
      {
        label: 'E',
        text: "Fairness may matter most of all. The behavioural economist Anika Lund has found that people are prepared to wait considerably longer if they believe the system is just. In her studies, nothing provoked anger more reliably than seeing someone who had arrived later being served first. This helps to explain the popularity of the single 'serpentine' queue, in which all customers wait in one line that feeds several counters. Although such a queue does not necessarily reduce the average wait, it removes the frustrating experience of choosing a line only to watch a neighbouring one move faster. Lund notes that in multiple-line systems, customers consistently believe that the other lines are quicker, a perception she attributes to the fact that people remember the occasions when they were overtaken far more vividly than those when they were not.",
      },
      {
        label: 'F',
        text: 'Cultural expectations also shape behaviour. In some societies, orderly queuing is regarded as a basic social duty, and anyone who pushes ahead is likely to be publicly criticised. In others, crowds gather around a counter and service goes to whoever is most assertive. Even within a single country, expectations may differ between, for example, a rural market and a city-centre bank. Professor David Okafor, an anthropologist, warns against treating either system as superior. In his view, each reflects different assumptions about how scarce resources should be shared, and visitors who apply the rules of their own country abroad frequently cause offence without realising it.',
      },
      {
        label: 'G',
        text: "Increasingly, technology is changing the queue itself. Many restaurants and clinics now send a text message when a table or appointment is ready, allowing customers to wait wherever they like. Such 'virtual queues' remove the physical line entirely, but they raise new questions. Marsh points out that when waiting becomes invisible, customers cannot see how many people are ahead of them, and some of the reassurance provided by a visible, moving line is lost. The challenge for designers, it seems, is not simply to make waiting shorter but to make it feel shorter, fairer and more predictable.",
      },
    ],
    groups: [
      {
        id: 'r08-g1',
        type: 'matching',
        instructions:
          'Reading Passage has seven paragraphs, A–G. Which paragraph contains the following information? Write the correct letter, A–G. NB You may use any letter more than once.',
        options: [
          { key: 'A', text: 'Paragraph A' },
          { key: 'B', text: 'Paragraph B' },
          { key: 'C', text: 'Paragraph C' },
          { key: 'D', text: 'Paragraph D' },
          { key: 'E', text: 'Paragraph E' },
          { key: 'F', text: 'Paragraph F' },
          { key: 'G', text: 'Paragraph G' },
        ],
        questions: [
          {
            id: 'r08-q1',
            number: 1,
            prompt: 'an example of an inexpensive response to customer complaints',
            answer: ['C'],
            explanation:
              "Paragraph C: instead of faster lifts, 'which would have been extremely costly', the hotel 'placed mirrors beside the lift doors'. Paragraph G also mentions a change in service, but not a cheap response to complaints.",
          },
          {
            id: 'r08-q2',
            number: 2,
            prompt: 'a reference to the original purpose of a mathematical approach to waiting',
            answer: ['B'],
            explanation:
              "Paragraph B: the engineer 'tried to calculate how many operators were needed to handle incoming calls', which founded queuing theory. Paragraph A mentions numbers (time spent waiting) but no mathematical method.",
          },
          {
            id: 'r08-q3',
            number: 3,
            prompt: 'the claim that some organisations intentionally give customers inaccurate information',
            answer: ['D'],
            explanation:
              "Paragraph D: 'some parks deliberately overstate these estimates' so visitors are pleasantly surprised. 'Deliberately overstate' = intentionally inaccurate. The trap is G, where information is missing rather than inaccurate.",
          },
          {
            id: 'r08-q4',
            number: 4,
            prompt: 'an estimate of how much time people spend waiting in a year',
            answer: ['A'],
            explanation:
              "Paragraph A: surveys 'suggest that the total may exceed a full working week annually'. Paragraph B mentions 'average waiting time' but gives no yearly figure.",
          },
          {
            id: 'r08-q5',
            number: 5,
            prompt: 'a drawback of doing away with the physical queue',
            answer: ['G'],
            explanation:
              "Paragraph G: virtual queues 'remove the physical line entirely', but customers 'cannot see how many people are ahead of them' and reassurance 'is lost'. Marsh is also named in C, but the drawback appears only in G.",
          },
        ],
      },
      {
        id: 'r08-g2',
        type: 'matching',
        instructions:
          'Look at the following statements and the list of researchers below. Match each statement with the correct researcher, A–D. NB You may use any letter more than once.',
        title: 'List of Researchers',
        options: [
          { key: 'A', text: 'Helen Marsh' },
          { key: 'B', text: 'Tomas Reyes' },
          { key: 'C', text: 'Anika Lund' },
          { key: 'D', text: 'David Okafor' },
        ],
        questions: [
          {
            id: 'r08-q6',
            number: 6,
            prompt: 'People tend to think that queues other than their own are moving faster.',
            answer: ['C'],
            explanation:
              "Paragraph E: Lund notes that 'customers consistently believe that the other lines are quicker'. The phrase 'move faster' also appears in E, but it is part of the writer's description, which Lund then explains.",
          },
          {
            id: 'r08-q7',
            number: 7,
            prompt: 'When people do not know why they are waiting, they are likely to assume that something bad has happened.',
            answer: ['B'],
            explanation:
              "Paragraph D: Reyes argues that with an unexplained wait 'people tend to imagine the worst: that they have been forgotten, or that something has gone wrong'.",
          },
          {
            id: 'r08-q8',
            number: 8,
            prompt: 'No single way of organising queues should be regarded as better than another.',
            answer: ['D'],
            explanation:
              "Paragraph F: Okafor 'warns against treating either system as superior'. Lund (E) explains why the serpentine queue is popular, but she does not call it superior to every other system, and she is not comparing cultures.",
          },
          {
            id: 'r08-q9',
            number: 9,
            prompt: 'A delay seems shorter when people have something to keep them busy.',
            answer: ['A'],
            explanation:
              "Paragraph C: Marsh says 'Idle time feels longer than busy time' and 'Give people something to do, and the wait shrinks'. Reyes (D) also reduces stress, but by giving information, not activity.",
          },
        ],
      },
      {
        id: 'r08-g3',
        type: 'matching',
        instructions: 'Complete the summary using the list of words, A–H, below. Write the correct letter, A–H.',
        title: 'Fairness and the single queue',
        options: [
          { key: 'A', text: 'memories' },
          { key: 'B', text: 'efficient' },
          { key: 'C', text: 'counters' },
          { key: 'D', text: 'maximum' },
          { key: 'E', text: 'fair' },
          { key: 'F', text: 'fears' },
          { key: 'G', text: 'average' },
          { key: 'H', text: 'managers' },
        ],
        questions: [
          {
            id: 'r08-q10',
            number: 10,
            prompt: "Lund's research shows that people will accept longer waits if they think the system is ____.",
            answer: ['E'],
            explanation:
              "Paragraph E: people wait longer 'if they believe the system is just'; 'just' = fair. 'Efficient' (B) is a trap: Lund says nothing about speed or efficiency here.",
          },
          {
            id: 'r08-q11',
            number: 11,
            prompt: 'In a serpentine queue, everyone waits in a single line which leads to a number of ____.',
            answer: ['C'],
            explanation:
              "Paragraph E: 'one line that feeds several counters'. 'Managers' (H) is never mentioned in connection with the queue.",
          },
          {
            id: 'r08-q12',
            number: 12,
            prompt: 'This type of queue does not always reduce the ____ waiting time.',
            answer: ['G'],
            explanation:
              "Paragraph E: such a queue 'does not necessarily reduce the average wait'. 'Maximum' (D) is a distractor; the passage does not discuss the longest wait.",
          },
          {
            id: 'r08-q13',
            number: 13,
            prompt:
              'Where there are several lines, the belief that other lines are quicker comes from the fact that people have stronger ____ of being overtaken.',
            answer: ['A'],
            explanation:
              "Paragraph E: people 'remember the occasions when they were overtaken far more vividly', i.e. they have stronger memories of them. 'Fears' (F) is a trap: the passage is about remembering, not fear.",
          },
        ],
      },
    ],
  },

  /* ================================================================== */
  /* r09 — Ancient Polynesian navigation (Academic, difficulty 2)        */
  /* ================================================================== */
  {
    id: 'r09',
    module: 'academic',
    difficulty: 2,
    title: 'Wayfinding',
    subtitle: 'How the islands of the Pacific were settled without maps or instruments',
    topic: 'history',
    minutes: 20,
    paragraphs: [
      {
        label: 'A',
        text: "Long before European sailors ventured far from sight of land, the ancestors of today's Polynesians were crossing thousands of kilometres of open ocean. Between roughly 3,000 and 800 years ago, they reached and settled almost every habitable island in a vast triangle of the Pacific whose corners are Hawaii, New Zealand and Easter Island. Some of these islands lie thousands of kilometres from their nearest inhabited neighbour. They did so without metal tools, written charts or magnetic compasses. For a long time, many Western scholars found this achievement so difficult to believe that they looked for other explanations.",
      },
      {
        label: 'B',
        text: 'One influential theory, put forward in the mid-twentieth century, held that the islands had been settled largely by accident. According to this view, canoes carrying fishermen had been blown off course by storms and had drifted until they happened to strike land. Supporters of the theory argued that deliberate two-way voyages over such distances were simply impossible without instruments. They also pointed out that no written records of such journeys existed. The idea was widely accepted for a time, but it had a serious weakness: computer simulations later showed that drifting canoes would almost never have reached the most remote islands, such as Hawaii, which lies far from any other land and against the prevailing winds.',
      },
      {
        label: 'C',
        text: 'The decisive challenge to the accident theory came from practical experiment. In 1976 a replica voyaging canoe sailed from Hawaii to Tahiti, a distance of more than 4,000 kilometres, guided by a navigator from Micronesia who used only traditional methods. The voyage took about a month, and its success demonstrated that intentional navigation across open ocean was entirely possible. It also triggered a cultural revival across the Pacific, as communities that had lost much of their traditional knowledge began to build canoes and train new navigators. Since then, the same canoe has made many further ocean crossings, and the training of navigators has spread to islands where the skills had almost completely disappeared.',
      },
      {
        label: 'D',
        text: 'The canoes themselves were remarkable pieces of engineering. Most long-distance vessels had two hulls, each carved from a single tree trunk, joined by a wooden platform on which the crew lived and stored supplies. The various parts were not nailed together but tied with cord made from coconut fibre, which allowed the structure to flex in heavy seas rather than crack. Sails were made from woven pandanus leaves, and the vessel was steered with a large paddle at the stern. A double-hulled canoe of this kind could carry two dozen people, together with the plants and animals they would need to establish a new settlement. Voyages were carefully prepared, and canoes were loaded with food that would not spoil quickly, such as dried fish and fermented breadfruit.',
      },
      {
        label: 'E',
        text: 'Navigation relied above all on the stars. A navigator memorised the points on the horizon at which dozens of stars rose and set, and used these as a kind of compass, a body of knowledge that took years of study to acquire, often beginning in childhood. As one star climbed too high to be useful, another rising at the same point would take its place. During the day, and on cloudy nights, the navigator turned to the ocean swells: long, regular waves generated by distant weather systems that can keep a constant direction for days. Experienced navigators are said to have detected changes in the swell pattern through the motion of the canoe beneath them, sometimes lying down in the hull to feel it more clearly.',
      },
      {
        label: 'F',
        text: 'As a canoe approached land, other signs became important. Certain seabirds fly out to sea in the morning to fish and return to land at dusk, so a navigator who saw them in the evening could follow their path. Clouds tend to gather and remain stationary over islands, and in some cases a greenish tint on the underside of a cloud indicated the presence of a shallow lagoon below. Floating vegetation and certain types of driftwood could also suggest that land was not far away. By combining these clues, a navigator could effectively expand the size of the target: an island perhaps only a few kilometres wide might be detectable from fifty kilometres away.',
      },
      {
        label: 'G',
        text: 'Much of this knowledge was never written down. It was passed from one generation to the next through chants, stories and years of apprenticeship, and a great deal of it was lost during the colonial period, when traditional voyaging was discouraged and, in some places, banned. In a few isolated communities, however, a handful of elderly navigators continued to practise their skills and were later able to teach them to a new generation. Today, navigators trained in the revived tradition have completed voyages around the world. Their achievements have not only confirmed the skill of their ancestors but have also given Pacific communities a renewed sense of pride in a heritage that outsiders once dismissed.',
      },
    ],
    groups: [
      {
        id: 'r09-g1',
        type: 'mcq',
        instructions: 'Choose the correct letter, A, B, C or D.',
        questions: [
          {
            id: 'r09-q1',
            number: 1,
            prompt: 'According to paragraph B, the accident theory was weakened by evidence that',
            options: [
              'storms in the Pacific were less frequent than had been believed.',
              'drifting canoes were unlikely to reach islands such as Hawaii.',
              'early settlers had in fact carried navigation instruments.',
              'fishermen rarely travelled far from their home islands.',
            ],
            answer: ['B'],
            explanation:
              "Paragraph B: simulations 'showed that drifting canoes would almost never have reached the most remote islands, such as Hawaii'. C is a trap: instruments are mentioned only in the theory's own argument, and paragraph A says the settlers had none.",
          },
          {
            id: 'r09-q2',
            number: 2,
            prompt: 'What was the main significance of the 1976 voyage?',
            options: [
              'It was the first ever voyage between Hawaii and Tahiti.',
              'It proved that deliberate long-distance navigation could be done.',
              'It showed that Micronesian methods were better than Polynesian ones.',
              'It was completed much more quickly than had been expected.',
            ],
            answer: ['B'],
            explanation:
              "Paragraph C: its success 'demonstrated that intentional navigation across open ocean was entirely possible'. A is a trap: the passage implies ancestors had made such voyages long before, and D is wrong because no expected time is mentioned.",
          },
          {
            id: 'r09-q3',
            number: 3,
            prompt: 'What did a navigator do when a guiding star rose too high in the sky?',
            options: [
              'He waited until the same star set again.',
              'He used a different star that rose at the same point.',
              'He changed to following the direction of the swells.',
              'He calculated its position by looking at the moon.',
            ],
            answer: ['B'],
            explanation:
              "Paragraph E: 'As one star climbed too high to be useful, another rising at the same point would take its place.' C is a trap: swells were used 'during the day, and on cloudy nights', not when a star rose too high.",
          },
          {
            id: 'r09-q4',
            number: 4,
            prompt: 'According to paragraph F, a navigator could detect an island from a greater distance by',
            options: [
              'following seabirds as they flew out to sea in the morning.',
              'combining several different natural signs.',
              'looking for patches of green-coloured water.',
              'steering towards moving clouds.',
            ],
            answer: ['B'],
            explanation:
              "Paragraph F: 'By combining these clues, a navigator could effectively expand the size of the target'. A is wrong because the birds lead to land in the evening; C is wrong because the green tint is on the cloud, not the water; D is wrong because the clouds are 'stationary'.",
          },
        ],
      },
      {
        id: 'r09-g2',
        type: 'gap',
        instructions: 'Label the diagram below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
        title: 'Diagram: a double-hulled voyaging canoe',
        questions: [
          {
            id: 'r09-q5',
            number: 5,
            prompt: 'Label (between the hulls): wooden ____ where the crew lived and kept supplies',
            answer: ['platform'],
            explanation:
              "Paragraph D: the hulls were 'joined by a wooden platform on which the crew lived and stored supplies'. 'Tree trunk' is a trap: that is what each hull was carved from.",
          },
          {
            id: 'r09-q6',
            number: 6,
            prompt: 'Label (joints): parts tied with cord made from ____',
            answer: ['coconut fibre', 'coconut fiber', 'coconut fibres', 'coconut fibers'],
            explanation:
              "Paragraph D: the parts were 'tied with cord made from coconut fibre'. The answer is two words, within the limit; 'nails' is a trap, as the parts were 'not nailed together'.",
          },
          {
            id: 'r09-q7',
            number: 7,
            prompt: 'Label (sail): made from woven ____ leaves',
            answer: ['pandanus'],
            explanation:
              "Paragraph D: 'Sails were made from woven pandanus leaves'. Do not write 'pandanus leaves', because 'leaves' is already printed after the gap.",
          },
          {
            id: 'r09-q8',
            number: 8,
            prompt: 'Label (stern): large ____ used for steering',
            answer: ['paddle'],
            explanation:
              "Paragraph D: 'the vessel was steered with a large paddle at the stern'. 'Large' is already given, so the single word 'paddle' completes the label.",
          },
        ],
      },
      {
        id: 'r09-g3',
        type: 'tfng',
        instructions:
          'Do the following statements agree with the information given in Reading Passage? Write TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this.',
        questions: [
          {
            id: 'r09-q9',
            number: 9,
            prompt: 'The accident theory was first proposed by a European historian.',
            answer: ['NOT GIVEN'],
            explanation:
              "Paragraph B says only that the theory was 'put forward in the mid-twentieth century'; who proposed it is not stated. 'Western scholars' in paragraph A is a trap: it does not name the theory's author or his profession.",
          },
          {
            id: 'r09-q10',
            number: 10,
            prompt: 'The navigator who guided the 1976 voyage came from Hawaii.',
            answer: ['FALSE'],
            explanation:
              "Paragraph C: the canoe was 'guided by a navigator from Micronesia'. Hawaii was the starting point of the voyage, which is the trap.",
          },
          {
            id: 'r09-q11',
            number: 11,
            prompt: 'The canoe used in the 1976 voyage was built entirely from traditional materials.',
            answer: ['NOT GIVEN'],
            explanation:
              "Paragraph C calls it a 'replica' and says the navigator 'used only traditional methods', but nothing is said about the materials used to build it. 'Traditional' refers to navigation methods, not construction.",
          },
          {
            id: 'r09-q12',
            number: 12,
            prompt: 'Ocean swells may continue in the same direction for several days.',
            answer: ['TRUE'],
            explanation:
              "Paragraph E describes swells as waves 'that can keep a constant direction for days'. 'Constant direction for days' = same direction for several days.",
          },
          {
            id: 'r09-q13',
            number: 13,
            prompt: 'Traditional voyaging was forbidden in some areas during the colonial period.',
            answer: ['TRUE'],
            explanation:
              "Paragraph G: voyaging 'was discouraged and, in some places, banned'. 'Banned' = forbidden, and 'in some places' = in some areas.",
          },
        ],
      },
    ],
  },

  /* ================================================================== */
  /* r10 — Placebo effects and medical ethics (Academic, difficulty 3)   */
  /* ================================================================== */
  {
    id: 'r10',
    module: 'academic',
    difficulty: 3,
    title: 'The Ethics of the Sugar Pill',
    subtitle: 'Should doctors ever prescribe a treatment they know to be inert?',
    topic: 'medicine',
    minutes: 20,
    paragraphs: [
      {
        label: 'A',
        text: "For most of medical history, the placebo has been treated as an embarrassment. The word itself, Latin for 'I shall please', was used in the eighteenth century to describe medicines given more to satisfy the patient than to cure the disease, and the implication was faintly contemptuous. In modern clinical trials, the placebo serves as a control: a new drug is judged effective only if it outperforms an identical-looking dummy. Improvement in the placebo group is regarded as noise, something to be subtracted before the real result can be seen. Researchers designing trials have, understandably, been more interested in eliminating the placebo response than in understanding it. Yet this framing obscures a fact that ought to interest anyone concerned with patient welfare: the noise is often substantial, and it is not imaginary.",
      },
      {
        label: 'B',
        text: "Placebo responses have been documented across a wide range of conditions, most reliably those in which symptoms are subjective and fluctuate, such as chronic pain, nausea and fatigue. Brain imaging studies have shown that expecting pain relief can trigger the release of the body's own pain-suppressing chemicals, and that blocking these chemicals reduces the placebo effect. The manner of treatment matters too. In several experiments, two placebo pills outperformed one, injections outperformed tablets, and expensive-looking packaging outperformed cheap. Perhaps most strikingly, patients who received warm, attentive consultations reported greater improvement than those who received the same inert treatment from a brisk and distant practitioner.",
      },
      {
        label: 'C',
        text: 'It is important not to overstate these findings. Placebos do not shrink tumours or repair broken bones, and claims that belief alone can cure serious disease are not merely unsupported but dangerous, since they may lead patients to abandon effective treatment. Moreover, some of the improvement recorded in placebo groups is not a placebo effect at all, but the natural tendency of many conditions to get better on their own, or of unusually severe symptoms to return towards average levels over time. Honest discussion of the placebo must begin by acknowledging that its power, though real, is limited and specific.',
      },
      {
        label: 'D',
        text: 'Within those limits, however, the question of whether doctors should deliberately use placebos is a genuine one, and I believe the conventional answer deserves to be reconsidered. That answer is that placebo prescribing is inherently deceptive and therefore wrong. A doctor who hands over a sugar pill while implying that it contains an active drug violates the principle of informed consent, on which the modern relationship between doctor and patient rests. Doctors also have a professional duty to tell patients the truth about their treatment, and many codes of medical conduct state this explicitly. If such deception were discovered, the argument runs, it would damage not only the trust of the individual patient but public confidence in medicine generally. I find this argument persuasive as far as it goes. Deception of this kind is, in my view, rarely justified.',
      },
      {
        label: 'E',
        text: "But the argument assumes that placebos only work if patients are deceived, and that assumption has been challenged. In a series of studies of so-called 'open-label' placebos, patients with long-term conditions were given pills and told plainly that they contained no active ingredient, though they were also told that inert pills had produced improvements in other patients. Many nonetheless reported meaningful relief compared with a group who received no pills at all. The mechanism is not well understood. It may be that the ritual of taking a pill, or the attention involved in being treated, produces benefits even when the patient knows exactly what the pill contains. Whatever the explanation, if honesty and benefit are compatible, the central ethical objection loses much of its force.",
      },
      {
        label: 'F',
        text: 'Surveys suggest that a considerable number of doctors already use what might be called impure placebos: treatments such as vitamins, or antibiotics for viral infections, which have real pharmacological properties but are unlikely to help the condition in question. This practice seems to me considerably more troubling than an honest sugar pill. Unnecessary antibiotics contribute to the spread of drug-resistant bacteria, and any active substance carries a risk of side effects. Patients who receive such treatments may also come to believe that they need medication for minor complaints, increasing the demand for prescriptions in the future. If doctors are going to rely on the placebo response, it would be better for them to do so openly than to disguise it behind treatments that carry real costs.',
      },
      {
        label: 'G',
        text: 'None of this means that placebos should become a routine part of medical practice. The evidence for open-label placebos comes largely from small studies, and larger trials are needed before firm conclusions can be drawn. What the research does suggest is that the elements surrounding treatment, such as the time a doctor spends listening, the clarity of an explanation and the confidence with which a plan is presented, are not mere courtesies but part of the therapy itself. A health system that squeezes consultations into a few minutes in the name of efficiency may be sacrificing a benefit it does not yet know how to measure.',
      },
    ],
    groups: [
      {
        id: 'r10-g1',
        type: 'ynng',
        instructions:
          'Do the following statements agree with the claims of the writer in Reading Passage? Write YES if the statement agrees with the claims of the writer, NO if the statement contradicts the claims of the writer, NOT GIVEN if it is impossible to say what the writer thinks about this.',
        questions: [
          {
            id: 'r10-q1',
            number: 1,
            prompt: 'The way placebos are viewed in clinical trials hides something important.',
            answer: ['YES'],
            explanation:
              "Paragraph A: 'this framing obscures a fact that ought to interest anyone concerned with patient welfare'. 'Obscures' = hides; the trap is the word 'noise', which sounds dismissive but is the view the writer criticises.",
          },
          {
            id: 'r10-q2',
            number: 2,
            prompt: 'Belief in a treatment can be enough to cure a serious illness.',
            answer: ['NO'],
            explanation:
              "Paragraph C: 'claims that belief alone can cure serious disease are not merely unsupported but dangerous'. The writer accepts placebo effects are real (A, B) but rejects this stronger claim.",
          },
          {
            id: 'r10-q3',
            number: 3,
            prompt: 'In most situations it is acceptable for a doctor to mislead a patient about a placebo.',
            answer: ['NO'],
            explanation:
              "Paragraph D: 'Deception of this kind is, in my view, rarely justified.' The trap is that the writer wants the conventional answer 'reconsidered', but only because placebos may work without deception (E).",
          },
          {
            id: 'r10-q4',
            number: 4,
            prompt: 'Open-label placebos produce greater benefits than placebos given without the patient\'s knowledge.',
            answer: ['NOT GIVEN'],
            explanation:
              "Paragraph E compares open-label patients only with 'a group who received no pills at all'; no comparison with deceptive placebos is made, and the writer gives no view on it.",
          },
          {
            id: 'r10-q5',
            number: 5,
            prompt: 'Giving patients treatments with active ingredients as placebos is more worrying than giving an honest inert pill.',
            answer: ['YES'],
            explanation:
              "Paragraph F: impure placebos 'seem to me considerably more troubling than an honest sugar pill', because of drug resistance and side effects.",
          },
        ],
      },
      {
        id: 'r10-g2',
        type: 'matching',
        instructions: 'Complete each sentence with the correct ending, A–G, below. Write the correct letter, A–G.',
        title: 'List of endings',
        options: [
          { key: 'A', text: 'is unaffected by the appearance of the treatment.' },
          { key: 'B', text: 'may encourage the development of resistant bacteria.' },
          { key: 'C', text: 'can cause the body to release its own pain-suppressing substances.' },
          { key: 'D', text: 'has been confirmed by large-scale clinical trials.' },
          { key: 'E', text: 'depends on the assumption that patients must be misled.' },
          { key: 'F', text: 'is actually caused by conditions improving without treatment.' },
          { key: 'G', text: 'is greater when the doctor appears distant.' },
        ],
        questions: [
          {
            id: 'r10-q6',
            number: 6,
            prompt: 'Brain imaging research suggests that the expectation of relief',
            answer: ['C'],
            explanation:
              "Paragraph B: 'expecting pain relief can trigger the release of the body's own pain-suppressing chemicals'. A and G contradict B, which says packaging and warm consultations increase the effect.",
          },
          {
            id: 'r10-q7',
            number: 7,
            prompt: 'Part of the improvement observed in placebo groups',
            answer: ['F'],
            explanation:
              "Paragraph C: some improvement 'is not a placebo effect at all, but the natural tendency of many conditions to get better on their own'.",
          },
          {
            id: 'r10-q8',
            number: 8,
            prompt: 'The traditional ethical objection to prescribing placebos',
            answer: ['E'],
            explanation:
              "Paragraph E: 'the argument assumes that placebos only work if patients are deceived'. 'The argument' refers back to the conventional answer in D that placebo prescribing is 'inherently deceptive and therefore wrong'.",
          },
          {
            id: 'r10-q9',
            number: 9,
            prompt: 'Prescribing antibiotics for viral infections as an impure placebo',
            answer: ['B'],
            explanation:
              "Paragraph F: 'Unnecessary antibiotics contribute to the spread of drug-resistant bacteria'. D is a trap: G says the open-label evidence comes 'largely from small studies' and larger trials are still needed.",
          },
        ],
      },
      {
        id: 'r10-g3',
        type: 'mcq',
        instructions: 'Choose the correct letter, A, B, C or D.',
        questions: [
          {
            id: 'r10-q10',
            number: 10,
            prompt: 'What point does the writer make about the manner of treatment in paragraph B?',
            options: [
              'It only matters for patients who are in severe pain.',
              'It can influence how much a placebo helps a patient.',
              'It is less important than the contents of the pill.',
              'It has mainly been studied using brain imaging.',
            ],
            answer: ['B'],
            explanation:
              "Paragraph B: 'The manner of treatment matters too', with examples such as two pills outperforming one and warm consultations producing 'greater improvement'. D is a trap: brain imaging is linked to expectation, not to the manner of treatment.",
          },
          {
            id: 'r10-q11',
            number: 11,
            prompt: 'What is the main purpose of paragraph C?',
            options: [
              'to argue that most placebo research is unreliable',
              'to stress that the limits of the placebo effect must be recognised',
              'to show that placebo effects are mostly imaginary',
              'to recommend that patients avoid conventional treatment',
            ],
            answer: ['B'],
            explanation:
              "Paragraph C ends: 'its power, though real, is limited and specific'. C contradicts 'though real'; D is the opposite of the writer's warning that such claims 'may lead patients to abandon effective treatment'.",
          },
          {
            id: 'r10-q12',
            number: 12,
            prompt: 'According to the writer, the way open-label placebos work',
            options: [
              'has now been clearly explained by researchers.',
              'is probably linked to the chemical content of the pills.',
              'may be connected with the experience of being treated.',
              'requires patients to be unaware of what they are taking.',
            ],
            answer: ['C'],
            explanation:
              "Paragraph E: 'It may be that the ritual of taking a pill, or the attention involved in being treated, produces benefits'. A contradicts 'The mechanism is not well understood'; B and D contradict the fact that the pills contain 'no active ingredient' and patients were told so.",
          },
          {
            id: 'r10-q13',
            number: 13,
            prompt: "What is the writer's main conclusion in paragraph G?",
            options: [
              'Placebos should be prescribed as a matter of routine.',
              'Very short consultations may reduce the benefits patients receive.',
              'Doctors should be trained to give open-label placebos.',
              'Health systems must find better ways to measure the placebo effect.',
            ],
            answer: ['B'],
            explanation:
              "Paragraph G: squeezing consultations 'into a few minutes' may mean 'sacrificing a benefit'. A contradicts the first sentence of G; D is a trap built on 'does not yet know how to measure', which is a comment, not a recommendation.",
          },
        ],
      },
    ],
  },

  /* ================================================================== */
  /* r11 — A history of public libraries (General Training, difficulty 1) */
  /* ================================================================== */
  {
    id: 'r11',
    module: 'general',
    difficulty: 1,
    title: 'Open to All',
    subtitle: 'A short history of the public library',
    topic: 'history',
    minutes: 20,
    paragraphs: [
      {
        label: 'A',
        text: 'Today we take it for granted that anyone can walk into a library, sit down with a book and then borrow it without paying anything. For most of history, however, collections of books belonged to the powerful. The famous library of Alexandria in ancient Egypt is said to have held hundreds of thousands of scrolls, yet it served a small circle of scholars rather than the general population. Ancient rulers, religious institutions and, later, universities gathered large numbers of manuscripts, but access to them was usually limited to scholars, priests and the wealthy. Because every book had to be copied by hand, books were rare and extremely valuable, and some medieval libraries chained their volumes to the shelves to prevent theft.',
      },
      {
        label: 'B',
        text: 'The invention of printing in the fifteenth century made books far cheaper to produce, but it did not immediately make them available to ordinary people, most of whom still could not afford to buy them. In the eighteenth century, a popular alternative appeared in Britain and its colonies: the subscription library. Members paid an annual fee, and the money was used to buy books that all members could borrow. Some of these libraries were set up by groups of tradesmen and workers who could not afford to build private collections on their own. Although they were an important step forward, subscription libraries were still closed to anyone who could not pay.',
      },
      {
        label: 'C',
        text: 'The idea that libraries should be paid for by taxes and open to everyone gained support during the nineteenth century. In 1850, the British parliament passed a law allowing towns to spend public money on free libraries, although at first only towns with a population of more than 10,000 could do so, and the amount they could raise was strictly limited. In the United States, the Boston Public Library, which opened in 1854, is often described as the first large free city library in the country. Supporters of these libraries argued that they would encourage self-improvement and keep working people away from less respectable ways of spending their free time. Not everyone agreed, however: some taxpayers objected to paying for books that other people would read.',
      },
      {
        label: 'D',
        text: 'The greatest expansion came at the end of the nineteenth century and the beginning of the twentieth, thanks largely to the Scottish-born businessman Andrew Carnegie. Having made an enormous fortune in the steel industry, Carnegie paid for the construction of more than 2,500 library buildings around the world. He did not simply hand over money, however. Each town had to provide the land and agree to pay for running the library from local taxes. This condition was designed to make sure that communities would value and look after their new libraries, rather than letting them fall into disuse once the building work was finished.',
      },
      {
        label: 'E',
        text: 'Throughout the twentieth century, libraries changed the way they served the public. In early libraries, readers usually had to ask a member of staff to fetch a book from a closed store; gradually, open shelves were introduced, allowing people to browse for themselves. Separate sections for children were created, and mobile libraries began to carry books to rural villages that were too small to have a library of their own. Many libraries also started to lend music recordings and films, and they became places where people could find information about jobs, health and local services. In many towns, the library also became a meeting place, hosting talks, exhibitions and reading groups.',
      },
      {
        label: 'F',
        text: 'In recent decades, many people predicted that the internet would make libraries unnecessary. In some places, funding cuts have indeed led to closures and shorter opening hours. Yet visitor numbers in many libraries remain high, partly because they now offer free internet access, help with digital skills and quiet spaces in which to study or work. Some even lend items such as tools, musical instruments and laptops. For people without a computer at home, the library may be the only place where they can apply for a job online or contact government departments. In this sense, the public library continues to do what its founders intended: to make knowledge available to everyone, whatever their income.',
      },
    ],
    groups: [
      {
        id: 'r11-g1',
        type: 'matching',
        instructions:
          'The text has six paragraphs, A–F. Choose the correct heading for paragraphs B–F from the list of headings below. Write the correct number, i–viii.',
        title: 'List of Headings',
        options: [
          { key: 'i', text: 'Still needed in the age of the internet' },
          { key: 'ii', text: 'Training the first professional librarians' },
          { key: 'iii', text: 'Sharing the cost of books' },
          { key: 'iv', text: 'A generous gift with conditions attached' },
          { key: 'v', text: 'The end of the printed book' },
          { key: 'vi', text: 'Libraries funded by public money' },
          { key: 'vii', text: 'The role of religious institutions' },
          { key: 'viii', text: 'New ways of serving readers' },
        ],
        questions: [
          {
            id: 'r11-q1',
            number: 1,
            prompt: 'Paragraph B',
            answer: ['iii'],
            explanation:
              "Paragraph B describes subscription libraries, where 'Members paid an annual fee' to buy books 'that all members could borrow' – the cost was shared. Printing is mentioned only briefly, so heading v is a trap.",
          },
          {
            id: 'r11-q2',
            number: 2,
            prompt: 'Paragraph C',
            answer: ['vi'],
            explanation:
              "Paragraph C: libraries 'paid for by taxes', and an 1850 law allowed towns 'to spend public money on free libraries'. Heading iv is a trap: Carnegie's private gift belongs to D.",
          },
          {
            id: 'r11-q3',
            number: 3,
            prompt: 'Paragraph D',
            answer: ['iv'],
            explanation:
              "Paragraph D: Carnegie paid for over 2,500 buildings but 'did not simply hand over money' – towns had to provide land and running costs. Heading vi is a trap: running costs came from local taxes, but the paragraph's focus is the gift and its conditions.",
          },
          {
            id: 'r11-q4',
            number: 4,
            prompt: 'Paragraph E',
            answer: ['viii'],
            explanation:
              "Paragraph E lists changes in service: open shelves, children's sections, mobile libraries, recordings and films, and information services. Heading ii is a trap: 'a member of staff' is mentioned, but not training.",
          },
          {
            id: 'r11-q5',
            number: 5,
            prompt: 'Paragraph F',
            answer: ['i'],
            explanation:
              "Paragraph F: despite predictions that 'the internet would make libraries unnecessary', visitor numbers 'remain high'. Heading v is a trap: the paragraph never says printed books are ending.",
          },
        ],
      },
      {
        id: 'r11-g2',
        type: 'gap',
        instructions: 'Complete the table below. Choose NO MORE THAN TWO WORDS AND/OR A NUMBER from the text for each answer.',
        title: 'Key developments in library history',
        questions: [
          {
            id: 'r11-q6',
            number: 6,
            prompt: 'Middle Ages | Some libraries ____ books to the shelves to stop people stealing them.',
            answer: ['chained'],
            explanation:
              "Paragraph A: 'some medieval libraries chained their volumes to the shelves to prevent theft'. 'Medieval' = Middle Ages.",
          },
          {
            id: 'r11-q7',
            number: 7,
            prompt: '18th century | Subscription libraries: each member paid an ____.',
            answer: ['annual fee'],
            explanation:
              "Paragraph B: 'Members paid an annual fee'. Both words are needed and the answer is within the two-word limit; 'an' before the gap shows a vowel sound comes next.",
          },
          {
            id: 'r11-q8',
            number: 8,
            prompt: '1850, Britain | At first, only towns with a population of over ____ could spend public money on free libraries.',
            answer: ['10,000', '10000', 'ten thousand'],
            explanation:
              "Paragraph C: 'only towns with a population of more than 10,000 could do so'. Do not confuse this with 1854 (Boston) or 2,500 (Carnegie's buildings).",
          },
          {
            id: 'r11-q9',
            number: 9,
            prompt: "Carnegie's libraries | Each town had to supply the ____ and pay the running costs.",
            answer: ['land'],
            explanation:
              "Paragraph D: 'Each town had to provide the land and agree to pay for running the library'. 'Building' is a trap: Carnegie paid for the buildings himself.",
          },
        ],
      },
      {
        id: 'r11-g3',
        type: 'tfng',
        instructions:
          'Do the following statements agree with the information given in the text? Write TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this.',
        questions: [
          {
            id: 'r11-q10',
            number: 10,
            prompt: 'Some subscription libraries were organised by working people.',
            answer: ['TRUE'],
            explanation:
              "Paragraph B: 'Some of these libraries were set up by groups of tradesmen and workers'. 'Set up' = organised.",
          },
          {
            id: 'r11-q11',
            number: 11,
            prompt: 'Andrew Carnegie regularly used public libraries when he was young.',
            answer: ['NOT GIVEN'],
            explanation:
              "Paragraph D mentions Carnegie's birthplace, his fortune and his conditions, but nothing about his own childhood reading. Do not rely on outside knowledge.",
          },
          {
            id: 'r11-q12',
            number: 12,
            prompt: 'Mobile libraries were introduced to serve people living in the countryside.',
            answer: ['TRUE'],
            explanation:
              "Paragraph E: 'mobile libraries began to carry books to rural villages that were too small to have a library of their own'. 'Rural' = countryside.",
          },
          {
            id: 'r11-q13',
            number: 13,
            prompt: 'Since the arrival of the internet, the number of library visitors has fallen everywhere.',
            answer: ['FALSE'],
            explanation:
              "Paragraph F: 'visitor numbers in many libraries remain high'. The trap is the closures 'in some places', which do not mean visitor numbers fell everywhere.",
          },
        ],
      },
    ],
  },

  /* ================================================================== */
  /* r12 — The rise of remote working (General Training, difficulty 2)   */
  /* ================================================================== */
  {
    id: 'r12',
    module: 'general',
    difficulty: 2,
    title: 'Working from Anywhere',
    subtitle: 'How remote work moved from the margins to the mainstream',
    topic: 'work',
    minutes: 20,
    paragraphs: [
      {
        label: 'A',
        text: 'Until quite recently, working from home was regarded as an unusual privilege, available mainly to freelance writers, designers and a small number of senior employees. Most organisations believed that staff needed to be in the office to be productive, and managers often judged commitment by how many hours their employees were visibly present at their desks. Employees who asked to work from home were sometimes suspected of being less ambitious than their colleagues. That assumption was challenged dramatically in 2020, when public health restrictions forced millions of office workers around the world to do their jobs from kitchen tables and spare bedrooms almost overnight.',
      },
      {
        label: 'B',
        text: "In fact, the technology that made this possible had been developing for decades. The term 'telecommuting' was first used in the 1970s by an American engineer who was interested in reducing traffic and fuel consumption. However, early experiments were limited by slow telephone connections and expensive equipment. It was the spread of fast home broadband, laptop computers and video-calling software in the 2000s and 2010s that made remote work practical for large numbers of people. Even so, before 2020 only a small minority of employees in most countries worked from home on a regular basis.",
      },
      {
        label: 'C',
        text: 'Researchers who have studied the change report mixed results. Economist Dr Laura Chen, who followed employees at an insurance company for two years, found that those working from home completed more tasks per day than their office-based colleagues, largely because they were interrupted less often. However, she also noticed that home workers were less likely to be promoted, a finding she linked to the tendency of managers to reward the people they see most often. Other studies, however, have found that productivity can fall when tasks depend on close cooperation between colleagues.',
      },
      {
        label: 'D',
        text: 'Psychologist Professor Mark Adeyemi has focused on wellbeing. He found that many remote workers appreciated the time and money saved by not commuting, but that a significant number struggled to separate work from home life. Without a journey to mark the beginning and end of the day, some people found themselves checking emails late into the evening. People who lived alone were also more likely to report feelings of isolation than those who shared their homes with others. Adeyemi recommends that home workers create small routines, such as a short walk before starting work, to replace the psychological function of the commute.',
      },
      {
        label: 'E',
        text: 'Not all the effects are felt by individuals. Urban planner Sofia Bianchi points out that the fall in office attendance has hit businesses in city centres, such as cafés and sandwich shops, which depended on daily commuters for much of their trade. At the same time, some smaller towns have benefited as workers have moved out of expensive cities in search of larger homes, and some local councils have begun converting empty office blocks into flats. Bianchi believes that city centres will need to attract more residents and leisure activities if they are to remain lively.',
      },
      {
        label: 'F',
        text: "For employers, the question now is how to organise work in the long term. Many have adopted a 'hybrid' model, in which staff spend part of the week in the office and part at home. A typical approach begins with a survey of employees to find out how they prefer to work. Managers then decide which tasks require people to be together, such as training new staff or planning projects, and which can be done alone. Next, the company sets 'anchor days' on which whole teams are expected to attend the office. Finally, the arrangement is reviewed after six months and adjusted if necessary. Human resources consultant James Porter warns that the most common mistake is to require people to come in without giving them a clear reason, so that they spend the day on video calls they could have made from home.",
      },
      {
        label: 'G',
        text: 'It seems unlikely that working life will return entirely to the patterns of the past. Equally, few experts expect the office to disappear. Instead, the workplace of the future may be less a place where people go to complete their individual tasks and more a place where they come together to share ideas, build relationships and learn from one another. For many organisations, the challenge will be to make the journey to the office feel worthwhile.',
      },
    ],
    groups: [
      {
        id: 'r12-g1',
        type: 'matching',
        instructions:
          'Look at the following statements and the list of people below. Match each statement with the correct person, A–D. NB You may use any letter more than once.',
        title: 'List of People',
        options: [
          { key: 'A', text: 'Laura Chen' },
          { key: 'B', text: 'Mark Adeyemi' },
          { key: 'C', text: 'Sofia Bianchi' },
          { key: 'D', text: 'James Porter' },
        ],
        questions: [
          {
            id: 'r12-q1',
            number: 1,
            prompt: 'Working from home may harm a person\'s chances of career progression.',
            answer: ['A'],
            explanation:
              "Paragraph C: Chen noticed 'home workers were less likely to be promoted'. Promotion = career progression.",
          },
          {
            id: 'r12-q2',
            number: 2,
            prompt: 'Some businesses have lost customers because fewer people travel into work.',
            answer: ['C'],
            explanation:
              "Paragraph E: Bianchi says lower office attendance 'has hit businesses in city centres ... which depended on daily commuters'. Adeyemi (D) also mentions commuting, but only its effect on workers' wellbeing.",
          },
          {
            id: 'r12-q3',
            number: 3,
            prompt: 'People who work at home need something to take the place of the journey to work.',
            answer: ['B'],
            explanation:
              "Paragraph D: Adeyemi recommends small routines 'to replace the psychological function of the commute'.",
          },
          {
            id: 'r12-q4',
            number: 4,
            prompt: 'Employers should explain why staff are being asked to come into the office.',
            answer: ['D'],
            explanation:
              "Paragraph F: Porter says the most common mistake is requiring people to come in 'without giving them a clear reason'. 'Anchor days' are part of the general process, not Porter's own point.",
          },
          {
            id: 'r12-q5',
            number: 5,
            prompt: 'Employees based at home got more done because they were disturbed less.',
            answer: ['A'],
            explanation:
              "Paragraph C: home workers 'completed more tasks per day ... largely because they were interrupted less often'. 'Interrupted' = disturbed; letters can be used more than once, so A appears twice.",
          },
        ],
      },
      {
        id: 'r12-g2',
        type: 'gap',
        instructions: 'Complete the flow-chart below. Choose NO MORE THAN TWO WORDS AND/OR A NUMBER from the text for each answer.',
        title: 'Introducing a hybrid working model',
        questions: [
          {
            id: 'r12-q6',
            number: 6,
            prompt: 'Step 1: Carry out a ____ of employees to find out their working preferences.',
            answer: ['survey'],
            explanation:
              "Paragraph F: 'A typical approach begins with a survey of employees to find out how they prefer to work'.",
          },
          {
            id: 'r12-q7',
            number: 7,
            prompt: 'Step 2: Identify tasks that need people to be together, e.g. training new staff or ____.',
            answer: ['planning projects', 'project planning'],
            explanation:
              "Paragraph F: tasks such as 'training new staff or planning projects'. 'Training new staff' is already in the prompt, so it cannot be the answer.",
          },
          {
            id: 'r12-q8',
            number: 8,
            prompt: 'Step 3: Set ____ when whole teams must attend the office.',
            answer: ['anchor days', 'anchor day'],
            explanation:
              "Paragraph F: 'the company sets 'anchor days' on which whole teams are expected to attend the office'. Both words are needed.",
          },
          {
            id: 'r12-q9',
            number: 9,
            prompt: 'Step 4: Review the arrangement after ____ and make changes if needed.',
            answer: ['six months', '6 months'],
            explanation:
              "Paragraph F: 'the arrangement is reviewed after six months and adjusted if necessary'. Write 'six months' or '6 months'; 'two years' (C) refers to Chen's study.",
          },
        ],
      },
      {
        id: 'r12-g3',
        type: 'mcq',
        instructions: 'Choose the correct letter, A, B, C or D.',
        questions: [
          {
            id: 'r12-q10',
            number: 10,
            prompt: 'Before 2020, many managers measured how committed employees were by',
            options: [
              'the quality of the work they produced.',
              'the amount of time they were seen in the office.',
              'their willingness to travel for work.',
              'their ability to use new technology.',
            ],
            answer: ['B'],
            explanation:
              "Paragraph A: managers 'judged commitment by how many hours their employees were visibly present at their desks'. A is a trap: productivity is mentioned, but not as the measure of commitment.",
          },
          {
            id: 'r12-q11',
            number: 11,
            prompt: "The person who first used the word 'telecommuting' wanted to",
            options: [
              'help companies save money on office rent.',
              'reduce traffic and the use of fuel.',
              'make it easier for parents to look after children.',
              'improve the quality of telephone connections.',
            ],
            answer: ['B'],
            explanation:
              "Paragraph B: the engineer 'was interested in reducing traffic and fuel consumption'. D is a trap: slow telephone connections are mentioned as a limitation, not his aim.",
          },
          {
            id: 'r12-q12',
            number: 12,
            prompt: 'What does the writer say about remote working before 2020?',
            options: [
              'It was impossible because the technology did not exist.',
              'It had become common in most countries.',
              'Only a small proportion of employees did it regularly.',
              'It was mainly done by senior managers.',
            ],
            answer: ['C'],
            explanation:
              "Paragraph B: 'before 2020 only a small minority of employees in most countries worked from home on a regular basis'. A contradicts 'made remote work practical' in the 2000s; D is a trap: A says 'mainly' freelancers and designers, with only 'a small number of senior employees'.",
          },
          {
            id: 'r12-q13',
            number: 13,
            prompt: 'What does the writer suggest about the office of the future?',
            options: [
              'It will be used mainly for working together and learning.',
              'It will disappear in most industries.',
              'It will usually be located in smaller towns.',
              'It will be used only for individual tasks.',
            ],
            answer: ['A'],
            explanation:
              "Paragraph G: it may become 'a place where they come together to share ideas, build relationships and learn from one another'. B contradicts 'few experts expect the office to disappear'; D reverses the writer's point.",
          },
        ],
      },
    ],
  },
];
