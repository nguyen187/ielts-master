import type { ReadingPassage } from '../types';

export const readingA: ReadingPassage[] = [
  /* ================================================================ */
  /* r01 — Urban beekeeping (difficulty 1)                             */
  /* ================================================================ */
  {
    id: 'r01',
    module: 'academic',
    difficulty: 1,
    title: 'Bees on the Rooftops',
    subtitle: 'Why city dwellers are taking up an ancient craft, and why some scientists are worried',
    topic: 'environment',
    minutes: 20,
    paragraphs: [
      {
        label: 'A',
        text: `For most of human history, beekeeping was a rural occupation, practised by farmers and monks who kept hives alongside their orchards and fields. Over the past two decades, however, the honeybee has quietly moved to town. Hives now sit on the roofs of office blocks, hotels, schools and railway stations in cities from London to Tokyo, and in some neighbourhoods the number of registered colonies has more than tripled since 2005. One large European capital is thought to host well over a thousand hives, including several on the roof of its opera house. What began as an eccentric hobby has become, for many urban residents, a visible symbol of their commitment to nature. In several cities, businesses can now rent a hive for their roof, complete with a professional beekeeper who visits every few weeks to inspect the colony.`,
      },
      {
        label: 'B',
        text: `The reasons behind this trend are partly emotional. During the early 2000s, newspapers carried alarming reports of colony collapse, a phenomenon in which the worker bees suddenly abandon a hive and fail to return. Many city dwellers concluded that the honeybee itself was in danger of disappearing and that keeping a colony was a practical way to help. Beekeeping courses run by local associations quickly filled up, and suppliers reported record sales of starter kits. For others, the attraction was simpler: a rooftop hive offered a rare chance to work with living creatures in an environment otherwise dominated by concrete and glass, and the jar of honey at the end of the summer was a welcome bonus.`,
      },
      {
        label: 'C',
        text: `Somewhat surprisingly, cities can be good places for bees. Urban parks, private gardens, cemeteries and roadside verges contain a remarkable variety of flowering plants, many of them ornamental species originally imported from other continents. Because these plants flower at different times, they provide nectar and pollen from early spring until late autumn, whereas a farming landscape planted with a single crop may offer a short burst of food followed by weeks of scarcity. Cities are also slightly warmer than the surrounding countryside, which extends the season during which bees can fly and forage. In addition, urban bees are less exposed to the agricultural pesticides that have been linked to declining insect health in many rural areas.`,
      },
      {
        label: 'D',
        text: `Yet the boom has attracted criticism from an unexpected source: ecologists who study wild pollinators. They point out that the honeybee is only one of many thousands of bee species, and in much of the world it is not even native. Britain, for example, has around 270 species of bee, the great majority of which are solitary insects that nest in soil or hollow plant stems and never produce honey. These wild bees, together with hoverflies, beetles and moths, carry out much of the pollination on which flowering plants depend. A single honeybee colony can contain 50,000 workers in midsummer, and each colony needs large quantities of nectar and pollen. Where hives are densely packed, the ecologists argue, honeybees may consume resources that wild species need, effectively crowding them out. A survey carried out in one European capital found that in the districts with the highest density of hives, the amount of pollen available per colony had fallen below the level needed to support healthy growth.`,
      },
      {
        label: 'E',
        text: `Disease is a further concern. Honeybees can carry viruses and parasites, and when many colonies are kept close together, infections pass easily from hive to hive. Among the most widespread threats is the varroa mite, a parasite that feeds on developing bees and spreads several damaging viruses. Some of these pathogens have also been detected in bumblebees feeding on the same flowers, although scientists have not yet established how much harm, if any, this causes to wild populations. Inexperienced keepers may fail to recognise the early signs of illness, and a single neglected hive can become a source of infection for an entire neighbourhood. For this reason, several city authorities now require new beekeepers to register their hives and to complete a basic training course before they begin.`,
      },
      {
        label: 'F',
        text: `None of this means that urban beekeeping should be abandoned, but it does suggest that enthusiasm needs to be guided by evidence. Many associations now encourage members to keep fewer hives and to invest instead in planting flowers that bloom in the gaps between the main seasons, when food is hardest to find. Others promote bee hotels, bundles of hollow tubes that offer nesting sites to solitary species. Several companies that installed rooftop hives as part of their environmental policies have replaced them with wildflower meadows on the same roofs. As one ecologist put it, a city that genuinely wants to help bees should think less about honey and more about habitat. If that message is heard, the rooftop hive may yet become part of a broader effort to make cities welcoming for all pollinators, not only the most famous one.`,
      },
    ],
    groups: [
      {
        id: 'r01-g1',
        type: 'matching',
        instructions:
          'Reading Passage 1 has six paragraphs, A–F. Choose the correct heading for each paragraph from the list of headings below. Write the correct number, i–ix.',
        title: 'List of Headings',
        options: [
          { key: 'i', text: 'The risk of spreading illness' },
          { key: 'ii', text: 'The commercial value of city honey' },
          { key: 'iii', text: 'Why people were drawn to the hobby' },
          { key: 'iv', text: 'Redirecting goodwill towards better solutions' },
          { key: 'v', text: 'A rural tradition finds a new home' },
          { key: 'vi', text: 'Official bans on rooftop hives' },
          { key: 'vii', text: 'Unexpected advantages of the urban environment' },
          { key: 'viii', text: 'Concern that one species may crowd out others' },
          { key: 'ix', text: 'How bees find their way around cities' },
        ],
        questions: [
          {
            id: 'r01-q1',
            number: 1,
            prompt: 'Paragraph A',
            answer: ['v'],
            explanation:
              'Paragraph A contrasts beekeeping as "a rural occupation" with the way the honeybee "has quietly moved to town", so v fits. Do not be distracted by the opera house detail, which is only an example.',
          },
          {
            id: 'r01-q2',
            number: 2,
            prompt: 'Paragraph B',
            answer: ['iii'],
            explanation:
              'Paragraph B explains "the reasons behind this trend": fear of colony collapse and the chance to work with living creatures. Honey is called only "a welcome bonus", so ii (commercial value) is a trap.',
          },
          {
            id: 'r01-q3',
            number: 3,
            prompt: 'Paragraph C',
            answer: ['vii'],
            explanation:
              'Paragraph C opens "Somewhat surprisingly, cities can be good places for bees" and lists varied flowers, warmth and fewer pesticides. Heading ix is a trap: the paragraph mentions foraging but never how bees navigate.',
          },
          {
            id: 'r01-q4',
            number: 4,
            prompt: 'Paragraph D',
            answer: ['viii'],
            explanation:
              'The main idea of D is that densely packed honeybees "may consume resources that wild species need, effectively crowding them out". The facts about British bee species support this argument rather than forming the heading.',
          },
          {
            id: 'r01-q5',
            number: 5,
            prompt: 'Paragraph E',
            answer: ['i'],
            explanation:
              'Paragraph E begins "Disease is a further concern" and describes infections passing "from hive to hive". Heading vi is a trap: authorities require registration and training, which is regulation, not a ban.',
          },
          {
            id: 'r01-q6',
            number: 6,
            prompt: 'Paragraph F',
            answer: ['iv'],
            explanation:
              'Paragraph F says enthusiasm "needs to be guided by evidence" and gives better alternatives: planting flowers, bee hotels and wildflower meadows. It explicitly says beekeeping should not be "abandoned", so this is redirection, not rejection.',
          },
        ],
      },
      {
        id: 'r01-g2',
        type: 'tfng',
        instructions:
          'Do the following statements agree with the information given in Reading Passage 1? Write TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this.',
        questions: [
          {
            id: 'r01-q7',
            number: 7,
            prompt: 'In some city neighbourhoods there are now more than three times as many registered bee colonies as there were in 2005.',
            answer: ['TRUE'],
            explanation:
              'Paragraph A states that "in some neighbourhoods the number of registered colonies has more than tripled since 2005". "More than three times as many" is a direct paraphrase of "more than tripled".',
          },
          {
            id: 'r01-q8',
            number: 8,
            prompt: 'Colony collapse was first observed in urban hives.',
            answer: ['NOT GIVEN'],
            explanation:
              'Paragraph B only says newspapers "carried alarming reports of colony collapse" in the early 2000s; it never says where the phenomenon was first observed. The trap is linking it to cities because the passage is about urban beekeeping.',
          },
          {
            id: 'r01-q9',
            number: 9,
            prompt: 'Most of the bee species found in Britain live in large colonies.',
            answer: ['FALSE'],
            explanation:
              'Paragraph D says "the great majority" of Britain\'s 270 species "are solitary insects". The figure of 50,000 workers refers to a honeybee colony, which is the trap.',
          },
          {
            id: 'r01-q10',
            number: 10,
            prompt: 'Scientists have shown that diseases carried by honeybees are causing serious harm to wild bumblebees.',
            answer: ['FALSE'],
            explanation:
              'Paragraph E says pathogens have been detected in bumblebees, "although scientists have not yet established how much harm, if any, this causes". The statement claims proof that the passage explicitly denies, so it contradicts the text rather than being not given.',
          },
        ],
      },
      {
        id: 'r01-g3',
        type: 'gap',
        instructions: 'Complete the summary below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
        title: 'New approaches to helping pollinators',
        questions: [
          {
            id: 'r01-q11',
            number: 11,
            prompt:
              'Beekeeping associations increasingly advise members to keep fewer hives and to plant flowers that bloom in the ____ between the main seasons.',
            answer: ['gaps'],
            explanation:
              'Paragraph F: "planting flowers that bloom in the gaps between the main seasons". "Seasons" is already in the sentence, so only "gaps" is needed.',
          },
          {
            id: 'r01-q12',
            number: 12,
            prompt: 'Some groups promote structures known as ____, which provide nesting sites for solitary bees.',
            answer: ['bee hotels', 'bee hotel'],
            explanation:
              'Paragraph F: "Others promote bee hotels, bundles of hollow tubes that offer nesting sites to solitary species." Writing "hollow tubes" would describe the structures but not give their name.',
          },
          {
            id: 'r01-q13',
            number: 13,
            prompt: 'Several companies have replaced their rooftop hives with ____.',
            answer: ['wildflower meadows', 'wildflower meadow', 'wild flower meadows'],
            explanation:
              'Paragraph F: companies "have replaced them with wildflower meadows on the same roofs". "Habitat" is a trap from the ecologist\'s quotation; it is a general idea, not what the companies installed.',
          },
        ],
      },
    ],
  },

  /* ================================================================ */
  /* r02 — History of the bicycle (difficulty 1)                       */
  /* ================================================================ */
  {
    id: 'r02',
    module: 'academic',
    difficulty: 1,
    title: 'Two Wheels, Two Centuries',
    subtitle: 'How the bicycle took shape through decades of trial and error',
    topic: 'history',
    minutes: 20,
    paragraphs: [
      {
        label: 'A',
        text: `Few machines seem as obvious as the bicycle. Two wheels, a frame, a seat and a pair of pedals: the design appears so natural that it is tempting to assume it must always have existed. Yet the bicycle is a surprisingly recent invention, and the familiar shape we know today was reached only after almost seventy years of experiment, false starts and occasional danger. Its history shows how an invention develops not in a single moment of genius but through a series of improvements, each solving a problem created by the one before.`,
      },
      {
        label: 'B',
        text: `The story usually begins in 1817 in the German city of Mannheim, where a civil servant named Karl Drais demonstrated what he called a 'running machine'. Its frame was made entirely of wood, and it had two wheels of equal size placed one behind the other. There were no pedals; riders sat astride the frame and pushed themselves along the ground with their feet, steering with a simple bar attached to the front wheel. On a good road, Drais claimed, the machine was faster than a man walking. Some historians have linked the invention to the disastrous summer of 1816, when failed harvests across Europe made oats so expensive that many people could no longer afford to feed horses, although Drais himself never mentioned this as a motive. The machine enjoyed a brief fashion among wealthy young men, but the craze faded within a few years, partly because several cities passed laws forbidding riders from using the pavements, where the surface was smoothest.`,
      },
      {
        label: 'C',
        text: `Almost half a century passed before the next significant step. In the 1860s, mechanics in Paris began attaching pedals and cranks directly to the front wheel of a two-wheeled machine, so that riders could propel themselves without touching the ground. The new velocipede, as it was called, became a sensation, and riding schools opened in several European capitals. Comfort, however, was not one of its virtues. Its heavy frame was made of iron, and its wooden wheels were fitted with iron tyres, which transmitted every bump of the cobbled streets directly to the rider. In Britain it soon earned the nickname 'boneshaker'.`,
      },
      {
        label: 'D',
        text: `Because the pedals were fixed to the front wheel, every turn of the pedals produced exactly one turn of the wheel. The only way to travel further with each stroke, and therefore to go faster, was to make the front wheel larger. During the 1870s, manufacturers did precisely this, producing machines whose front wheels measured up to 1.5 metres in diameter, while the rear wheel shrank to a fraction of that size. Solid rubber tyres made these high-wheelers more comfortable than the boneshaker, and on smooth roads they were remarkably fast. But the rider sat almost directly above the front wheel, and any obstacle could throw him forward over the handlebars, a fall known as 'taking a header'. Not surprisingly, the high-wheeler was largely the preserve of athletic young men with money to spend, many of whom joined the cycling clubs that sprang up in this period.`,
      },
      {
        label: 'E',
        text: `The solution to these dangers arrived in 1885 with the so-called safety bicycle, of which the most successful early example was the Rover, built in the English city of Coventry. Instead of being attached to the front wheel, the pedals drove the rear wheel by means of a chain. Since gears could now multiply the effect of each turn of the pedals, the wheels no longer needed to be large, and both could be of moderate and equal size. The rider sat lower, between the wheels, and could put a foot on the ground when necessary. Three years later came another crucial improvement: the air-filled tyre, developed by a Scottish vet, John Dunlop, who had originally been trying to make his young son's tricycle more comfortable to ride. The combination of chain drive and air-filled tyres proved so superior that within a decade the high-wheeler had become a curiosity.`,
      },
      {
        label: 'F',
        text: `The 1890s saw a bicycle boom in Europe and North America. Factory production lowered prices, and for the first time ordinary workers could afford a machine that allowed them to live several kilometres from their workplace. The impact on women was particularly striking. Long skirts were impractical on a bicycle, and many women adopted shorter skirts or loose trousers known as bloomers, a change that scandalised some observers. More importantly, the bicycle gave women a means of travelling independently, without a chaperone, and it became closely associated with the wider campaign for women's rights.`,
      },
      {
        label: 'G',
        text: `In the twentieth century, the motor car displaced the bicycle as the preferred means of transport in many Western countries, and cycling came to be seen chiefly as a sport or a children's pastime. The Netherlands and Denmark were notable exceptions: there, the bicycle remained an everyday means of transport throughout the century, helped by flat terrain and, from the 1970s, by deliberate government policy. Today, concerns about traffic congestion, air pollution and public health have prompted cities around the world to build cycle lanes and introduce bicycle-sharing schemes, while electric bicycles are attracting riders who might once have dismissed cycling as too strenuous. Two centuries after Drais's running machine, the bicycle's story is far from over.`,
      },
    ],
    groups: [
      {
        id: 'r02-g1',
        type: 'matching',
        instructions:
          'Reading Passage 1 has seven paragraphs, A–G. Which paragraph contains the following information? Write the correct letter, A–G. NB You may use any letter more than once.',
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
            id: 'r02-q1',
            number: 1,
            prompt: 'a reference to legal restrictions on where an early machine could be ridden',
            answer: ['B'],
            explanation:
              'Paragraph B: "several cities passed laws forbidding riders from using the pavements". No other paragraph mentions laws; G mentions "government policy", which is a trap but is not a restriction.',
          },
          {
            id: 'r02-q2',
            number: 2,
            prompt: 'an explanation of why one wheel was made much bigger than the other',
            answer: ['D'],
            explanation:
              'Paragraph D: because pedals were fixed to the front wheel, "the only way to travel further with each stroke... was to make the front wheel larger". Paragraph E mentions wheel size too, but explains why wheels became smaller and equal.',
          },
          {
            id: 'r02-q3',
            number: 3,
            prompt: 'a description of how cycling influenced what people wore',
            answer: ['F'],
            explanation:
              'Paragraph F: "many women adopted shorter skirts or loose trousers known as bloomers". This is the only paragraph about clothing.',
          },
          {
            id: 'r02-q4',
            number: 4,
            prompt: 'mention of an improvement originally intended for a child\'s vehicle',
            answer: ['E'],
            explanation:
              'Paragraph E: Dunlop "had originally been trying to make his young son\'s tricycle more comfortable to ride". Paragraph G mentions cycling as "a children\'s pastime", which is the trap.',
          },
          {
            id: 'r02-q5',
            number: 5,
            prompt: 'a comparison between the speed of an early machine and that of a pedestrian',
            answer: ['B'],
            explanation:
              'Paragraph B: "Drais claimed, the machine was faster than a man walking". Paragraph D says high-wheelers were "remarkably fast" but makes no comparison with walking. This is the second answer for B, which the NB instruction allows.',
          },
        ],
      },
      {
        id: 'r02-g2',
        type: 'mcq',
        instructions: 'Choose the correct letter, A, B, C or D.',
        questions: [
          {
            id: 'r02-q6',
            number: 6,
            prompt: 'According to some historians, the running machine may have been developed in response to',
            options: [
              'a shortage of skilled mechanics.',
              'the high cost of keeping horses.',
              'laws restricting the use of pavements.',
              'a demand from wealthy young men for new entertainment.',
            ],
            answer: ['B'],
            explanation:
              'Paragraph B: historians link it to 1816, when oats became "so expensive that many people could no longer afford to feed horses". The pavement laws (C) and wealthy young men (D) are in the same paragraph but explain why the craze faded and who adopted it, not why it was invented.',
          },
          {
            id: 'r02-q7',
            number: 7,
            prompt: 'The velocipede was nicknamed the \'boneshaker\' because',
            options: [
              'it was made entirely of iron.',
              'it was uncomfortable to ride on rough streets.',
              'it often threw riders over the handlebars.',
              'its front wheel was unusually large.',
            ],
            answer: ['B'],
            explanation:
              'Paragraph C: its iron tyres "transmitted every bump of the cobbled streets directly to the rider". A is a trap because only the frame and tyres were iron, and the wheels were wooden. C and D describe the later high-wheeler.',
          },
          {
            id: 'r02-q8',
            number: 8,
            prompt: 'Who mainly rode the high-wheeler?',
            options: [
              'factory workers travelling to their jobs',
              'women wishing to travel independently',
              'athletic young men who had money',
              'members of the general public in large cities',
            ],
            answer: ['C'],
            explanation:
              'Paragraph D: the high-wheeler "was largely the preserve of athletic young men with money to spend". Workers (A) and women (B) appear in Paragraph F and are linked to the later safety bicycle boom.',
          },
          {
            id: 'r02-q9',
            number: 9,
            prompt: 'What does the writer say about cycling in the Netherlands and Denmark?',
            options: [
              'It almost disappeared before being revived in the 1970s.',
              'It remained a normal way of travelling throughout the twentieth century.',
              'It was supported by government policy from the start of the twentieth century.',
              'It was mainly regarded as a sport.',
            ],
            answer: ['B'],
            explanation:
              'Paragraph G: "the bicycle remained an everyday means of transport throughout the century". C is wrong because government policy helped only "from the 1970s". D describes other Western countries.',
          },
        ],
      },
      {
        id: 'r02-g3',
        type: 'gap',
        instructions: 'Complete the table below. Choose ONE WORD AND/OR A NUMBER from the passage for each answer.',
        title: 'Stages in the development of the bicycle',
        questions: [
          {
            id: 'r02-q10',
            number: 10,
            prompt: 'Running machine (1817) — frame made of ____; no pedals; rider pushed along the ground with the feet',
            answer: ['wood'],
            explanation:
              'Paragraph B: "Its frame was made entirely of wood". "Iron" is a trap because it describes the frame of the later velocipede in Paragraph C.',
          },
          {
            id: 'r02-q11',
            number: 11,
            prompt: 'Velocipede (1860s) — pedals and cranks attached directly to the ____ wheel',
            answer: ['front'],
            explanation:
              'Paragraph C: mechanics began "attaching pedals and cranks directly to the front wheel". "Rear" is a trap, because the rear wheel is driven by a chain on the safety bicycle.',
          },
          {
            id: 'r02-q12',
            number: 12,
            prompt: 'High-wheeler (1870s) — front wheel up to ____ metres in diameter; dangerous falls',
            answer: ['1.5', 'one and a half', '1½'],
            explanation:
              'Paragraph D: "front wheels measured up to 1.5 metres in diameter". "Metres" is already printed in the table, so only the number is needed.',
          },
          {
            id: 'r02-q13',
            number: 13,
            prompt: 'Safety bicycle (1885) — rear wheel driven by a ____; wheels of equal size',
            answer: ['chain'],
            explanation:
              'Paragraph E: "the pedals drove the rear wheel by means of a chain". "Gears" are mentioned too, but they multiply the effect of pedalling rather than drive the wheel. The table also needs a singular noun after "a".',
          },
        ],
      },
    ],
  },

  /* ================================================================ */
  /* r03 — Sleep and memory (difficulty 2)                             */
  /* ================================================================ */
  {
    id: 'r03',
    module: 'academic',
    difficulty: 2,
    title: 'The Sleeping Brain as Archivist',
    subtitle: 'What recent research reveals about the links between sleep and memory',
    topic: 'science',
    minutes: 20,
    paragraphs: [
      {
        label: 'A',
        text: `For most of the twentieth century, sleep was regarded as a period of rest during which the brain more or less switched off. One of the earliest hints that the picture might be more complicated came from an experiment carried out in the 1920s, in which students learned lists of nonsense syllables and were tested a few hours later. Those who had slept in the interval remembered considerably more than those who had stayed awake. At the time, the researchers concluded that sleep simply shielded memories from interference: while we are asleep, no new information arrives to push out what we have just learned. Sleep, in this view, was a protective pause rather than a productive process.`,
      },
      {
        label: 'B',
        text: `That passive interpretation has now largely been abandoned. Sleep is not a single state but a cycle of stages that repeats roughly every ninety minutes, moving from light sleep into deep, or slow-wave, sleep and then into rapid eye movement (REM) sleep, the stage most associated with vivid dreaming. Much of the most influential work on memory has focused on slow-wave sleep. Dr Helena Marsh recorded the activity of individual neurons in the hippocampus, a structure deep in the brain, while rats learned to find their way through a maze. When the animals later slept, the same neurons fired in the same order as they had during the task, but roughly twenty times faster. Marsh argues that this 'replay' is the mechanism by which experiences are transferred from the hippocampus, which she describes as a temporary store, to the cortex, where they can be kept for years.`,
      },
      {
        label: 'C',
        text: `If replay strengthens memories, it might be possible to encourage it deliberately. Professor Tomas Reyes, who began by experimenting with smells before switching to sounds, asked volunteers to learn the positions of fifty images on a computer screen. Each image was paired with a characteristic sound, such as a cat's miaow for a picture of a cat. Later, while the volunteers were in slow-wave sleep, half of the sounds were played again at low volume. On waking, participants recalled the positions of images whose sounds had been replayed more accurately than those of the others. Reyes is careful not to overstate the result. The improvement, he notes, is in the region of ten per cent, and the technique is, in his words, 'a laboratory curiosity, not yet a study aid'.`,
      },
      {
        label: 'D',
        text: `REM sleep appears to make a different contribution. Dr Aiko Fujiwara gave participants a numerical puzzle that could be solved slowly by following a set of instructions, but much more quickly by anyone who noticed a hidden rule. After a first attempt, some participants slept for a night while others remained awake. Those whose sleep contained substantial periods of REM were up to three times as likely to discover the rule as those who had not slept. Fujiwara believes that during REM sleep the brain loosens the normal links between memories, allowing it to combine pieces of information that are not usually connected. If she is right, the familiar advice to 'sleep on' a problem has a sound biological basis.`,
      },
      {
        label: 'E',
        text: `Not everyone accepts that REM sleep is so important. Professor Daniel Okafor points out that many of the studies in this field involve fewer than thirty participants, which makes their results vulnerable to chance. More tellingly, he notes that certain widely prescribed antidepressants greatly reduce REM sleep, yet patients who take them for years do not show obvious problems with learning or memory. Okafor does not deny that sleep matters for memory; indeed, he regards the evidence for the role of slow-wave sleep as strong. His objection is that the case for REM has been accepted too readily because it fits an attractive story about dreams.`,
      },
      {
        label: 'F',
        text: `While most researchers have looked at what sleep does after learning, Dr Ingrid Solberg has examined what happens when people are deprived of sleep beforehand. In her studies, volunteers who had been kept awake for a night were shown a series of photographs while their brains were scanned. Compared with well-rested participants, they showed markedly reduced activity in the hippocampus, and their ability to form new memories fell by about 40 per cent. Solberg is particularly concerned about adolescents, whose natural sleep pattern shifts later during the teenage years, so that early school hours leave many of them chronically short of sleep. She has become a prominent advocate of later start times for secondary schools.`,
      },
      {
        label: 'G',
        text: `Many questions remain unanswered, including how the brain decides which memories are worth keeping and which can be discarded. Nevertheless, some practical conclusions are already emerging. A night of sleep after learning appears to be far more valuable than an extra hour of revision taken from the night. Even daytime naps can help, provided they include slow-wave sleep; naps of only a few minutes, which rarely go beyond light sleep, seem to offer little benefit for memory. The image of the sleeping brain as an idle machine has given way to something closer to an archivist, sorting, filing and occasionally rearranging the day's experiences while we are unaware of it.`,
      },
    ],
    groups: [
      {
        id: 'r03-g1',
        type: 'matching',
        instructions:
          'Look at the following statements (Questions 1–5) and the list of researchers below. Match each statement with the correct researcher, A–E. NB You may use any letter more than once.',
        title: 'List of Researchers',
        options: [
          { key: 'A', text: 'Helena Marsh' },
          { key: 'B', text: 'Tomas Reyes' },
          { key: 'C', text: 'Aiko Fujiwara' },
          { key: 'D', text: 'Daniel Okafor' },
          { key: 'E', text: 'Ingrid Solberg' },
        ],
        questions: [
          {
            id: 'r03-q1',
            number: 1,
            prompt: 'A particular stage of sleep may help people to make unexpected connections between ideas.',
            answer: ['C'],
            explanation:
              'Paragraph D: Fujiwara believes REM sleep lets the brain "combine pieces of information that are not usually connected". Okafor (D) also discusses REM, but he doubts how important it is.',
          },
          {
            id: 'r03-q2',
            number: 2,
            prompt: 'The benefits of an experimental technique are currently too small to be of practical use.',
            answer: ['B'],
            explanation:
              'Paragraph C: Reyes says the improvement is "in the region of ten per cent" and calls the technique "a laboratory curiosity, not yet a study aid".',
          },
          {
            id: 'r03-q3',
            number: 3,
            prompt: 'Going without sleep reduces the brain\'s capacity to take in new information.',
            answer: ['E'],
            explanation:
              'Paragraph F: after a sleepless night, Solberg\'s volunteers\' "ability to form new memories fell by about 40 per cent". The other researchers study sleep after learning, not deprivation before it.',
          },
          {
            id: 'r03-q4',
            number: 4,
            prompt: 'Evidence from people who take certain medicines over a long period casts doubt on a popular theory.',
            answer: ['D'],
            explanation:
              'Paragraph E: Okafor notes that antidepressants reduce REM sleep, "yet patients who take them for years do not show obvious problems with learning or memory".',
          },
          {
            id: 'r03-q5',
            number: 5,
            prompt: 'Activity during sleep moves recent experiences to a part of the brain where they can be stored for longer.',
            answer: ['A'],
            explanation:
              'Paragraph B: Marsh argues that replay transfers experiences "from the hippocampus... to the cortex, where they can be kept for years". Reyes (B) also works on replay, but he tests a way to trigger it and does not describe the transfer.',
          },
        ],
      },
      {
        id: 'r03-g2',
        type: 'tfng',
        instructions:
          'Do the following statements agree with the information given in Reading Passage 1? Write TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this.',
        questions: [
          {
            id: 'r03-q6',
            number: 6,
            prompt: 'The researchers who conducted the 1920s experiment believed that sleep actively strengthened memories.',
            answer: ['FALSE'],
            explanation:
              'Paragraph A: they "concluded that sleep simply shielded memories from interference", calling it "a protective pause rather than a productive process". The active view is the modern one in Paragraph B, which is the trap.',
          },
          {
            id: 'r03-q7',
            number: 7,
            prompt: 'In Marsh\'s experiments, sequences of neural activity were repeated more quickly during sleep than during the original task.',
            answer: ['TRUE'],
            explanation:
              'Paragraph B: the neurons "fired in the same order as they had during the task, but roughly twenty times faster".',
          },
          {
            id: 'r03-q8',
            number: 8,
            prompt: 'Reyes found that smells were less effective than sounds in strengthening memories.',
            answer: ['NOT GIVEN'],
            explanation:
              'Paragraph C says only that Reyes "began by experimenting with smells before switching to sounds"; it gives no reason and no comparison of results. The trap is assuming that he switched because smells worked less well.',
          },
          {
            id: 'r03-q9',
            number: 9,
            prompt: 'Okafor rejects the idea that slow-wave sleep plays a part in memory.',
            answer: ['FALSE'],
            explanation:
              'Paragraph E: Okafor "regards the evidence for the role of slow-wave sleep as strong". He questions only REM, so do not apply his scepticism to sleep in general.',
          },
        ],
      },
      {
        id: 'r03-g3',
        type: 'gap',
        instructions: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
        questions: [
          {
            id: 'r03-q10',
            number: 10,
            prompt: 'Marsh describes the hippocampus as a ____ store for experiences.',
            answer: ['temporary'],
            explanation:
              'Paragraph B: "the hippocampus, which she describes as a temporary store". "Long-term" would describe the cortex, which is the trap.',
          },
          {
            id: 'r03-q11',
            number: 11,
            prompt:
              'In Fujiwara\'s study, participants whose sleep included substantial REM were up to ____ as likely as non-sleepers to find the hidden rule.',
            answer: ['three times', '3 times'],
            explanation:
              'Paragraph D: they "were up to three times as likely to discover the rule". Both words are needed, since "three" alone would not fit the grammar of the sentence.',
          },
          {
            id: 'r03-q12',
            number: 12,
            prompt: 'Solberg has called for secondary schools to introduce later ____.',
            answer: ['start times', 'start time'],
            explanation:
              'Paragraph F: she is "a prominent advocate of later start times for secondary schools". "School hours" is a trap because the passage criticises "early school hours" and does not call for later ones in those words.',
          },
          {
            id: 'r03-q13',
            number: 13,
            prompt: 'Daytime naps appear to benefit memory only if they contain ____.',
            answer: ['slow-wave sleep', 'slow wave sleep'],
            explanation:
              'Paragraph G: "naps can help, provided they include slow-wave sleep". "Light sleep" is the trap, because short naps that rarely go beyond light sleep "offer little benefit". A hyphenated word counts as one word, so this answer is within the limit.',
          },
        ],
      },
    ],
  },

  /* ================================================================ */
  /* r04 — Desalination (difficulty 2)                                 */
  /* ================================================================ */
  {
    id: 'r04',
    module: 'academic',
    difficulty: 2,
    title: 'Turning the Tide',
    subtitle: 'The promise and the price of desalination',
    topic: 'technology',
    minutes: 20,
    paragraphs: [
      {
        label: 'A',
        text: `Water covers more than two-thirds of the Earth's surface, yet only about 3 per cent of it is fresh, and most of that is locked away in glaciers, ice caps and deep underground aquifers. As populations grow and droughts become more frequent and severe, a growing number of countries are looking to the one source that is effectively unlimited: the sea. There are now more than 20,000 desalination plants in operation worldwide, supplying drinking water to hundreds of millions of people. The Middle East accounts for almost half of global capacity, but plants are increasingly being built in places as varied as Australia, California, Spain and China.`,
      },
      {
        label: 'B',
        text: `The oldest approach to removing salt from seawater imitates the natural water cycle. In thermal distillation, seawater is heated until it evaporates, leaving the salt behind, and the vapour is then cooled so that it condenses as fresh water. The most common industrial version, multi-stage flash distillation, passes heated seawater through a series of chambers kept at progressively lower pressures, so that part of the water 'flashes' into steam in each chamber. The method is reliable and can cope with very salty or polluted water, but it consumes large amounts of heat. For this reason, thermal plants are often built alongside power stations, where they can make use of heat that would otherwise be wasted.`,
      },
      {
        label: 'C',
        text: `Since the 1980s, however, thermal methods have steadily lost ground to reverse osmosis, which now provides around 70 per cent of the world's desalination capacity. In this process, seawater is pumped at very high pressure against a semi-permeable membrane, a thin sheet of material whose pores are large enough to let water molecules through but small enough to stop salt ions. The pressures involved are considerable, typically between 55 and 80 times atmospheric pressure. Before it reaches the membranes, the water must be carefully pre-treated to remove sand, algae and bacteria; otherwise, these build up on the membrane surface and reduce its performance, a problem known as fouling. Membranes must be cleaned regularly and replaced every few years.`,
      },
      {
        label: 'D',
        text: `Energy is the largest single cost of desalination, and it is here that the most dramatic progress has been made. The first reverse osmosis plants of the 1970s used more than 20 kilowatt-hours of electricity to produce a cubic metre of fresh water. Modern plants need about 3 kilowatt-hours. Much of this improvement is due to devices called pressure exchangers. The concentrated salty water left behind by the membranes is still under high pressure when it leaves the system, and pressure exchangers transfer this pressure directly to the incoming seawater, reducing the work that the pumps must do. Engineers calculate that the theoretical minimum energy needed to desalinate seawater is around one kilowatt-hour per cubic metre, so further gains are possible, though they will be harder to achieve.`,
      },
      {
        label: 'E',
        text: `The most serious environmental concern is the waste product, known as brine. For every litre of fresh water produced, a typical plant discharges about 1.5 litres of brine, roughly twice as salty as the sea. Being denser than seawater, the brine tends to sink and spread across the sea floor, where it can reduce oxygen levels and harm organisms that cannot move away. It may also contain chemicals used during pre-treatment and cleaning. Modern outfalls use diffusers, which spray the brine through many small openings so that it mixes quickly with the surrounding water. Some researchers have proposed extracting valuable substances such as magnesium and lithium from brine, which could turn a waste into a resource, but in most cases this is not yet economically viable.`,
      },
      {
        label: 'F',
        text: `A less obvious problem occurs at the other end of the plant. Open-sea intakes draw in enormous volumes of water, and with it fish eggs, larvae and plankton, which are killed as they pass through the system, a process called entrainment. Larger animals may be trapped against the intake screens. One alternative is to use subsurface intakes: wells drilled beneath the seabed, where the overlying sand acts as a natural filter. These greatly reduce harm to marine life and lessen the need for pre-treatment, but they are suitable only where the local geology allows and generally cannot supply the largest plants.`,
      },
      {
        label: 'G',
        text: `Thanks to improvements in technology, the cost of desalinated water from large modern plants has fallen to between 50 cents and one US dollar per cubic metre. Even so, it remains more expensive than most alternatives. Repairing leaking pipes, recycling wastewater and encouraging households and farms to use less water can often deliver the same volume more cheaply, and with a smaller environmental footprint. Critics therefore argue that desalination should be treated as a last resort rather than a first choice. Its supporters reply that, in regions with no rivers to tap and little rain to capture, there may be no realistic alternative, and they point to plants powered by solar energy as evidence that the technology can become cleaner as well as cheaper.`,
      },
    ],
    groups: [
      {
        id: 'r04-g1',
        type: 'matching',
        instructions:
          'Reading Passage 1 has seven paragraphs, A–G. Which paragraph contains the following information? Write the correct letter, A–G. NB You may use any letter more than once.',
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
            id: 'r04-q1',
            number: 1,
            prompt: 'a description of a way of reusing energy contained in waste water',
            answer: ['D'],
            explanation:
              'Paragraph D: pressure exchangers take the pressure of the outgoing salty water and "transfer this pressure directly to the incoming seawater". Paragraph B also mentions reusing waste heat, but from power stations, not from the plant\'s own waste water.',
          },
          {
            id: 'r04-q2',
            number: 2,
            prompt: 'the reason why some desalination plants are located next to electricity generators',
            answer: ['B'],
            explanation:
              'Paragraph B: thermal plants are "often built alongside power stations, where they can make use of heat that would otherwise be wasted".',
          },
          {
            id: 'r04-q3',
            number: 3,
            prompt: 'mention of useful materials that could be obtained from a by-product',
            answer: ['E'],
            explanation:
              'Paragraph E: researchers propose "extracting valuable substances such as magnesium and lithium from brine". The by-product is brine.',
          },
          {
            id: 'r04-q4',
            number: 4,
            prompt: 'a comparison between desalination and other methods of providing water',
            answer: ['G'],
            explanation:
              'Paragraph G: repairing pipes, recycling wastewater and saving water "can often deliver the same volume more cheaply". Paragraph B compares two desalination methods with each other, which is the trap.',
          },
        ],
      },
      {
        id: 'r04-g2',
        type: 'gap',
        instructions: 'Complete the notes below. Choose ONE WORD ONLY from the passage for each answer.',
        title: 'Reverse osmosis and its effects',
        questions: [
          {
            id: 'r04-q5',
            number: 5,
            prompt: 'Process: membrane allows water molecules to pass but stops salt ____',
            answer: ['ions', 'ion'],
            explanation:
              'Paragraph C: the pores "let water molecules through but small enough to stop salt ions". "Salt" is already given, so the answer is "ions".',
          },
          {
            id: 'r04-q6',
            number: 6,
            prompt: 'Pre-treatment: removes sand, algae and bacteria to prevent ____',
            answer: ['fouling'],
            explanation:
              'Paragraph C: if not removed, these "build up on the membrane surface... a problem known as fouling".',
          },
          {
            id: 'r04-q7',
            number: 7,
            prompt: 'Energy: use has fallen to about 3 kWh per cubic metre, largely thanks to pressure ____',
            answer: ['exchangers', 'exchanger'],
            explanation:
              'Paragraph D: "Much of this improvement is due to devices called pressure exchangers." "Pumps" is a trap; the exchangers reduce the work the pumps must do.',
          },
          {
            id: 'r04-q8',
            number: 8,
            prompt: 'Brine: sinks to the sea floor because it is ____ than seawater',
            answer: ['denser'],
            explanation:
              'Paragraph E: "Being denser than seawater, the brine tends to sink". "Saltier" is not the word used in the passage, which says "twice as salty", and the passage gives density as the reason the brine sinks.',
          },
          {
            id: 'r04-q9',
            number: 9,
            prompt: 'Intakes: subsurface intakes are ____ beneath the seabed, using sand as a filter',
            answer: ['wells', 'well'],
            explanation:
              'Paragraph F: "subsurface intakes: wells drilled beneath the seabed, where the overlying sand acts as a natural filter". "Screens" is a trap; they belong to open-sea intakes.',
          },
        ],
      },
      {
        id: 'r04-g3',
        type: 'gap',
        instructions: 'Answer the questions below. Choose NO MORE THAN THREE WORDS AND/OR A NUMBER from the passage for each answer.',
        questions: [
          {
            id: 'r04-q10',
            number: 10,
            prompt: 'Which region has almost half of the world\'s desalination capacity? ____',
            answer: ['the Middle East', 'Middle East'],
            explanation:
              'Paragraph A: "The Middle East accounts for almost half of global capacity". The other places listed (Australia, California, Spain, China) are where new plants are "increasingly being built".',
          },
          {
            id: 'r04-q11',
            number: 11,
            prompt: 'What proportion of global desalination capacity does reverse osmosis now provide? ____',
            answer: ['70 per cent', '70 percent', '70%', '70', 'seventy per cent', 'seventy percent'],
            explanation:
              'Paragraph C: reverse osmosis "now provides around 70 per cent of the world\'s desalination capacity". Do not confuse this with the 55–80 times atmospheric pressure in the same paragraph.',
          },
          {
            id: 'r04-q12',
            number: 12,
            prompt: 'How much brine does a typical plant discharge for each litre of fresh water? ____',
            answer: ['1.5 litres', '1.5 liters', '1.5', 'one and a half litres'],
            explanation:
              'Paragraph E: "For every litre of fresh water produced, a typical plant discharges about 1.5 litres of brine". "Twice" refers to how salty the brine is, not how much is produced.',
          },
          {
            id: 'r04-q13',
            number: 13,
            prompt: 'What term describes the killing of small organisms after they are drawn into a plant? ____',
            answer: ['entrainment'],
            explanation:
              'Paragraph F: eggs, larvae and plankton "are killed as they pass through the system, a process called entrainment". Larger animals trapped against screens are a separate problem.',
          },
        ],
      },
    ],
  },

  /* ================================================================ */
  /* r05 — Economics of language extinction (difficulty 3)             */
  /* ================================================================ */
  {
    id: 'r05',
    module: 'academic',
    difficulty: 3,
    title: 'The Price of Silence',
    subtitle: 'Can economics explain, or justify, the disappearance of the world\'s languages?',
    topic: 'society',
    minutes: 20,
    paragraphs: [
      {
        label: 'A',
        text: `Of the roughly 7,000 languages spoken today, around 40 per cent are classed as endangered, and many have fewer than a thousand speakers, most of them elderly. It is frequently claimed that a language dies every two weeks. That figure, repeated in countless articles and documentaries, is almost certainly an exaggeration, but the general trend it describes is not in dispute. What is disputed is what, if anything, should be done about it, and here the discussion has increasingly been framed in the language of economics.`,
      },
      {
        label: 'B',
        text: `The economist's starting point is that language shift is, for the most part, the outcome of individual choices. A family in a rural community who decide to raise their children in the national language rather than in their ancestral tongue are not acting irrationally. They are responding to clear incentives: the dominant language opens doors to education, employment and migration, while the minority language may be useful only within a shrinking circle of relatives and neighbours. Languages, in this respect, behave rather like communication networks, in that the value of each one depends on how many other people use it. As speakers leave a small network, its value to those who remain falls, which encourages further departures, and the decline accelerates. On this view, language extinction is regrettable but is essentially the sum of many sensible decisions, and intervention would amount to asking poor families to sacrifice their children's prospects for the sake of a heritage they may value less than outsiders do.`,
      },
      {
        label: 'C',
        text: `I find the first half of this argument persuasive and the second half much less so. It is true that parents generally act reasonably given the options before them. But the fact that each decision is rational does not mean that the collective outcome is desirable. Economists are perfectly familiar with situations in which individuals pursuing their own interests produce a result that nobody wants; overfishing is the classic example. A language is, in important respects, a public good. Once it exists, any member of the community can use it without reducing its availability to others, and the benefits it provides, from a sense of shared identity to a body of songs, stories and oral history, are held in common rather than owned. Markets notoriously undersupply public goods, because no individual can capture the full value of maintaining them.`,
      },
      {
        label: 'D',
        text: `There is also the matter of irreversibility. Most economic losses can, at least in principle, be recovered: a factory that closes can be reopened, and a forest that is cut down can be replanted. A language whose last fluent speaker has died can occasionally be reconstructed from recordings and written records, as a handful of revival projects have shown, but the result is never quite the language that was lost. Standard economic reasoning recognises that when a decision cannot be undone, there is value in keeping one's options open, something economists call option value. To tolerate the disappearance of languages simply because their present market value is low is to ignore this principle.`,
      },
      {
        label: 'E',
        text: `Some advocates of language preservation go further, arguing that endangered languages contain practical knowledge, about medicinal plants, for instance, or local ecosystems, that could one day prove commercially valuable. I am uneasy with this line of reasoning. It may well be true in particular cases, but it implies that a language is worth saving only if it can be shown to yield a profit, and it invites the obvious reply that any useful knowledge could simply be recorded and translated before the language disappears. The stronger case rests not on what a language might one day earn, but on what it means to the people who speak it.`,
      },
      {
        label: 'F',
        text: `What follows for policy? The encouraging news is that the costs of support are modest. Bilingual schooling, local radio and the recognition of minority languages in official documents cost very little compared with most public programmes, and studies in several countries have found that children educated bilingually perform at least as well in the dominant language as their monolingual peers. This matters, because it removes the apparent trade-off at the heart of the economist's argument: parents need not choose between their children's prospects and their heritage. Where language policies have failed, it has usually been because they were imposed from above by governments with little understanding of the communities concerned.`,
      },
      {
        label: 'G',
        text: `Nothing in this argument requires us to preserve every language at any cost, and it would be unrealistic to expect all 7,000 to survive the present century. But it does require us to abandon the comfortable idea that, because language loss is the product of free choices, it lies beyond the reach of sensible public action. Markets are very good at many things. Valuing what cannot be bought or sold is not among them.`,
      },
    ],
    groups: [
      {
        id: 'r05-g1',
        type: 'ynng',
        instructions:
          'Do the following statements agree with the views of the writer in Reading Passage 1? Write YES if the statement agrees with the views of the writer, NO if the statement contradicts the views of the writer, NOT GIVEN if it is impossible to say what the writer thinks about this.',
        questions: [
          {
            id: 'r05-q1',
            number: 1,
            prompt: 'The claim that a language disappears every fortnight overstates the true rate of loss.',
            answer: ['YES'],
            explanation:
              'Paragraph A: the "every two weeks" figure "is almost certainly an exaggeration". The writer still accepts the general trend, but that does not change the view of this particular figure.',
          },
          {
            id: 'r05-q2',
            number: 2,
            prompt: 'Parents who bring up their children in a dominant language are behaving foolishly.',
            answer: ['NO'],
            explanation:
              'Paragraph B says such families "are not acting irrationally", and in Paragraph C the writer agrees: "parents generally act reasonably given the options before them". The trap is to assume that a writer who opposes language loss must blame the parents.',
          },
          {
            id: 'r05-q3',
            number: 3,
            prompt: 'Linguists have been too slow to document endangered languages.',
            answer: ['NOT GIVEN'],
            explanation:
              'The writer mentions "recordings and written records" (D) and recording knowledge (E), but never judges how quickly linguists have done this work. Nothing in the passage shows the writer\'s opinion on the speed of documentation.',
          },
          {
            id: 'r05-q4',
            number: 4,
            prompt: 'The possibility that endangered languages contain commercially useful knowledge is the strongest reason for protecting them.',
            answer: ['NO'],
            explanation:
              'Paragraph E: the writer is "uneasy with this line of reasoning" and says "The stronger case rests not on what a language might one day earn". The trap is that the writer accepts it "may well be true in particular cases".',
          },
          {
            id: 'r05-q5',
            number: 5,
            prompt: 'A lack of understanding of local communities helps to explain why some language policies have been unsuccessful.',
            answer: ['YES'],
            explanation:
              'Paragraph F: failures have usually happened because policies "were imposed from above by governments with little understanding of the communities concerned".',
          },
        ],
      },
      {
        id: 'r05-g2',
        type: 'mcq',
        instructions: 'Choose the correct letter, A, B, C or D.',
        questions: [
          {
            id: 'r05-q6',
            number: 6,
            prompt: 'The comparison between languages and communication networks in Paragraph B is used to explain',
            options: [
              'why minority languages are difficult for outsiders to learn.',
              'why the decline of a language tends to speed up.',
              'why governments prefer to promote a single national language.',
              'why migrants usually abandon their first language.',
            ],
            answer: ['B'],
            explanation:
              'Paragraph B: as speakers leave, "its value to those who remain falls, which encourages further departures, and the decline accelerates". Migration (D) is mentioned only as one advantage of the dominant language.',
          },
          {
            id: 'r05-q7',
            number: 7,
            prompt: 'What is the writer\'s attitude towards the economist\'s argument described in Paragraph B?',
            options: [
              'The writer accepts it completely.',
              'The writer accepts part of it but disputes its conclusion.',
              'The writer rejects it as based on false assumptions about parents.',
              'The writer considers it irrelevant to the question of language policy.',
            ],
            answer: ['B'],
            explanation:
              'Paragraph C: "I find the first half of this argument persuasive and the second half much less so." C is wrong because the writer agrees with the assumption that parents act reasonably.',
          },
          {
            id: 'r05-q8',
            number: 8,
            prompt: 'The writer refers to overfishing as an example of',
            options: [
              'a public good that markets fail to provide.',
              'a loss that cannot be reversed.',
              'sensible individual decisions leading to an undesirable collective result.',
              'a problem that economists have only recently recognised.',
            ],
            answer: ['C'],
            explanation:
              'Paragraph C: overfishing is "the classic example" of "individuals pursuing their own interests produce a result that nobody wants". A is a trap, because the public good discussed is the language, not the fishery. D contradicts "Economists are perfectly familiar".',
          },
          {
            id: 'r05-q9',
            number: 9,
            prompt: 'According to Paragraph F, research on bilingual education suggests that it',
            options: [
              'is more expensive than most other public programmes.',
              'does not harm children\'s performance in the dominant language.',
              'should be made compulsory in minority-language communities.',
              'has so far been tried in only one or two countries.',
            ],
            answer: ['B'],
            explanation:
              'Paragraph F: bilingual children "perform at least as well in the dominant language as their monolingual peers". A contradicts "cost very little", and D contradicts "studies in several countries".',
          },
        ],
      },
      {
        id: 'r05-g3',
        type: 'gap',
        instructions: 'Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.',
        title: 'Why markets undervalue languages',
        questions: [
          {
            id: 'r05-q10',
            number: 10,
            prompt:
              'The writer argues that a language is a kind of public ____, since everyone in a community can use it and its benefits are held in common.',
            answer: ['good'],
            explanation:
              'Paragraph C: "A language is, in important respects, a public good." The singular is required after "a kind of".',
          },
          {
            id: 'r05-q11',
            number: 11,
            prompt: 'Markets provide too little of such things, because no single person can ____ the full value of maintaining them.',
            answer: ['capture'],
            explanation:
              'Paragraph C: "no individual can capture the full value of maintaining them". "Undersupply" is a trap because it describes what markets do, not what individuals cannot do.',
          },
          {
            id: 'r05-q12',
            number: 12,
            prompt:
              'Because a lost language can rarely be fully recovered, the writer appeals to what economists call option ____, the benefit of keeping choices open.',
            answer: ['value'],
            explanation:
              'Paragraph D: "something economists call option value". "Market value" in the next sentence is a trap, since it is what the writer says should not be the only measure.',
          },
          {
            id: 'r05-q13',
            number: 13,
            prompt: 'In the writer\'s view, markets are poor at valuing anything that cannot be bought or ____.',
            answer: ['sold'],
            explanation:
              'Paragraph G: "Valuing what cannot be bought or sold is not among them."',
          },
        ],
      },
    ],
  },

  /* ================================================================ */
  /* r06 — Deep-sea mining controversy (difficulty 3)                  */
  /* ================================================================ */
  {
    id: 'r06',
    module: 'academic',
    difficulty: 3,
    title: 'Treasure in the Abyss',
    subtitle: 'Should the world begin mining the deep ocean floor?',
    topic: 'environment',
    minutes: 20,
    paragraphs: [
      {
        label: 'A',
        text: `Between four and six kilometres beneath the surface of the Pacific Ocean, scattered across a vast abyssal plain between Hawaii and Mexico, lie trillions of dark, potato-sized lumps known as polymetallic nodules. Formed over millions of years as metals dissolved in seawater slowly accumulated around a fragment of shell or a shark's tooth, they are rich in nickel, cobalt, manganese and copper, the very metals needed for the batteries of electric vehicles. To a number of mining companies, the nodules represent an opportunity too valuable to ignore. To many scientists, they are part of one of the least understood ecosystems on the planet. Having followed this debate for several years, I have come to believe that the case for mining them has not yet been made.`,
      },
      {
        label: 'B',
        text: `The industry's argument nevertheless deserves to be taken seriously. Mining on land is often destructive: forests are cleared, rivers are polluted, and in some regions the extraction of cobalt has been linked to dangerous working conditions and child labour. The nodules, by contrast, lie loose on the seabed. They can be collected by robotic vehicles that move slowly across the ocean floor, without the need for blasting, digging or the removal of whole hillsides, and no human community lives on the abyssal plain to be displaced. Samuel Ibe, an executive with one of the leading exploration companies, describes the nodules as 'the cleanest source of metals the world has ever had'. It is an appealing comparison, but it is also a misleading one, because it sets a harm that we understand well against one that we have barely begun to measure.`,
      },
      {
        label: 'C',
        text: `For much of the twentieth century, the deep seabed was assumed to be almost lifeless. Recent surveys have shown the opposite. Expeditions to the nodule fields have collected thousands of species, and in some areas around nine in ten of the animals collected were new to science. Many of them, including sponges and soft corals, live attached to the nodules themselves and could not survive without them. Since the nodules grow by only a few millimetres every million years, removing them would be, on any human timescale, permanent. 'We would be destroying a library before we have even read the titles,' says the marine ecologist Marta Kowal. There is also the question of sediment: the collecting vehicles would stir up clouds of fine particles that could drift for many kilometres and smother animals that feed by filtering the water. When scientists revisited a patch of seabed that had been deliberately ploughed in an experiment in the late 1980s, they found that the tracks were still clearly visible decades later and that many forms of life had not returned.`,
      },
      {
        label: 'D',
        text: `Nor is it clear that the metals will be needed in the quantities the industry predicts. The economist Rafael Moreno points out that forecasts of demand often assume that today's battery technology will remain unchanged, when in fact manufacturers are already moving towards designs that use far less cobalt, or none at all. Prices for several of the metals concerned have fallen sharply in recent years. I do not suggest that mining companies are acting in bad faith, but they plainly have a strong incentive to present the need for their product in the most urgent possible terms. Meanwhile, Priya Nair, who researches battery recycling, estimates that by the 2040s, as the first generation of electric cars reaches the end of its life, recovered materials could meet a substantial share of demand.`,
      },
      {
        label: 'E',
        text: `The question of who decides is equally troubling. Mining in international waters is overseen by the International Seabed Authority, a body established under the United Nations Convention on the Law of the Sea. Its mandate is both to regulate mining and to ensure that it takes place for the benefit of humankind, which in practice means encouraging it. It is difficult to see how an organisation charged with promoting an industry can also be trusted to restrain it. After more than a decade of negotiation, the Authority has still not agreed a final set of rules, and more than thirty countries have called for a pause until the science is better understood. Joseph Tanaka, who represents a Pacific island state at the negotiations, captures the dilemma: mining revenue could transform his country's finances, but the tuna fisheries on which it depends might be damaged. He supports a pause, while insisting that small nations should not be lectured by wealthy countries that built their own prosperity on mining.`,
      },
      {
        label: 'F',
        text: `What, then, should be done? I am not arguing for a permanent ban. The world does need metals for the transition away from fossil fuels, and mining on land carries real human and environmental costs. But the sensible response to uncertainty on this scale is to wait until we know enough to judge the risks, to invest in recycling and in battery designs that need fewer scarce metals, and only then to decide whether, where and how the nodules should be collected. They have lain on the ocean floor for millions of years. They can wait a few decades more.`,
      },
    ],
    groups: [
      {
        id: 'r06-g1',
        type: 'matching',
        instructions:
          'Reading Passage 1 has six paragraphs, A–F. Choose the correct heading for each paragraph from the list of headings below. Write the correct number, i–ix.',
        title: 'List of Headings',
        options: [
          { key: 'i', text: 'Doubts over how much metal will be needed' },
          { key: 'ii', text: 'The technology used to lift nodules to the surface' },
          { key: 'iii', text: 'A hidden resource and a divided opinion' },
          { key: 'iv', text: 'Patience as the wiser course' },
          { key: 'v', text: 'The promise of cleaner extraction' },
          { key: 'vi', text: 'A worldwide ban that has already been agreed' },
          { key: 'vii', text: 'A regulator with conflicting duties' },
          { key: 'viii', text: 'Ancient, fragile and largely unknown' },
          { key: 'ix', text: 'How island nations would share mining profits' },
        ],
        questions: [
          {
            id: 'r06-q1',
            number: 1,
            prompt: 'Paragraph A',
            answer: ['iii'],
            explanation:
              'Paragraph A describes the nodules on the ocean floor and contrasts the companies\' view ("an opportunity too valuable to ignore") with the scientists\' view, then states the writer\'s position.',
          },
          {
            id: 'r06-q2',
            number: 2,
            prompt: 'Paragraph B',
            answer: ['v'],
            explanation:
              'Paragraph B presents the industry case that collecting loose nodules avoids the damage of land mining, quoting "the cleanest source of metals". Heading ii is a trap: robotic vehicles are mentioned only in passing, and lifting to the surface is never described.',
          },
          {
            id: 'r06-q3',
            number: 3,
            prompt: 'Paragraph C',
            answer: ['viii'],
            explanation:
              'Paragraph C stresses unknown species ("nine in ten... new to science"), nodules that take millions of years to form and slow recovery from disturbance, so it matches "ancient, fragile and largely unknown".',
          },
          {
            id: 'r06-q4',
            number: 4,
            prompt: 'Paragraph D',
            answer: ['i'],
            explanation:
              'Paragraph D opens "Nor is it clear that the metals will be needed in the quantities the industry predicts" and supports this with changing batteries, falling prices and recycling.',
          },
          {
            id: 'r06-q5',
            number: 5,
            prompt: 'Paragraph E',
            answer: ['vii'],
            explanation:
              'Paragraph E: the Authority\'s mandate is "both to regulate mining and to ensure that it takes place", so it must promote and restrain the industry at once. Heading ix is a trap: Tanaka mentions revenue but nothing about how profits would be shared, and vi is wrong because countries have only "called for a pause".',
          },
          {
            id: 'r06-q6',
            number: 6,
            prompt: 'Paragraph F',
            answer: ['iv'],
            explanation:
              'Paragraph F argues that "the sensible response... is to wait" and ends "They can wait a few decades more". Heading vi is wrong, since the writer is "not arguing for a permanent ban" and no ban has been agreed.',
          },
        ],
      },
      {
        id: 'r06-g2',
        type: 'ynng',
        instructions:
          'Do the following statements agree with the claims of the writer in Reading Passage 1? Write YES if the statement agrees with the claims of the writer, NO if the statement contradicts the claims of the writer, NOT GIVEN if it is impossible to say what the writer thinks about this.',
        questions: [
          {
            id: 'r06-q7',
            number: 7,
            prompt: 'The industry\'s comparison between land mining and seabed mining is unreliable because one of the two harms is poorly understood.',
            answer: ['YES'],
            explanation:
              'Paragraph B: the comparison is "misleading... because it sets a harm that we understand well against one that we have barely begun to measure". The writer agrees that the argument "deserves to be taken seriously", but still finds it misleading.',
          },
          {
            id: 'r06-q8',
            number: 8,
            prompt: 'The International Seabed Authority is well placed to act as an impartial regulator of deep-sea mining.',
            answer: ['NO'],
            explanation:
              'Paragraph E: "It is difficult to see how an organisation charged with promoting an industry can also be trusted to restrain it." The writer clearly doubts that the Authority is impartial.',
          },
          {
            id: 'r06-q9',
            number: 9,
            prompt: 'Mining companies should be required to pay for independent research into deep-sea ecosystems.',
            answer: ['NOT GIVEN'],
            explanation:
              'The writer wants to "wait until we know enough to judge the risks" but never says who should fund the research. The trap is to combine the call for more research with the criticism of companies in Paragraph D.',
          },
          {
            id: 'r06-q10',
            number: 10,
            prompt: 'Deep-sea mining should be prohibited permanently.',
            answer: ['NO'],
            explanation:
              'Paragraph F: "I am not arguing for a permanent ban." The writer wants to delay a decision, not rule mining out forever.',
          },
        ],
      },
      {
        id: 'r06-g3',
        type: 'matching',
        instructions:
          'Look at the following statements (Questions 11–13) and the list of people below. Match each statement with the correct person, A–E. NB You may use any letter more than once.',
        title: 'List of People',
        options: [
          { key: 'A', text: 'Samuel Ibe' },
          { key: 'B', text: 'Marta Kowal' },
          { key: 'C', text: 'Rafael Moreno' },
          { key: 'D', text: 'Priya Nair' },
          { key: 'E', text: 'Joseph Tanaka' },
        ],
        questions: [
          {
            id: 'r06-q11',
            number: 11,
            prompt: 'Materials taken from old products could supply a significant proportion of future needs.',
            answer: ['D'],
            explanation:
              'Paragraph D: Nair estimates that "recovered materials could meet a substantial share of demand" when old electric car batteries reach the end of their life. Moreno (C) also questions demand, but his argument is about changes in battery design, not recycling.',
          },
          {
            id: 'r06-q12',
            number: 12,
            prompt: 'Seabed mining could harm an industry that some countries rely on.',
            answer: ['E'],
            explanation:
              'Paragraph E: Tanaka warns that "the tuna fisheries on which it depends might be damaged". Kowal (B) describes harm to marine life, but she does not mention any industry.',
          },
          {
            id: 'r06-q13',
            number: 13,
            prompt: 'Nodules offer a less damaging source of metals than any that has existed before.',
            answer: ['A'],
            explanation:
              'Paragraph B: Ibe calls the nodules "the cleanest source of metals the world has ever had". The writer reports this view but calls it "misleading", so the view belongs to Ibe and not to the writer.',
          },
        ],
      },
    ],
  },
];
