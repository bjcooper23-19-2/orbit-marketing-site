// Fictional family information. The whole visual is decorative and hidden from assistive technology.
// Positions are [left %, top %, width px, rotation deg, depth]; mobile positions omit depth.
const mail = (from, subject, copy) => `<div class="mail-bar"><span>Inbox</span><span>⋯</span></div><div class="mail-from">${from}</div><strong>${subject}</strong><p>${copy}</p><div class="mail-actions">Reply&nbsp;&nbsp; Forward&nbsp;&nbsp; Archive</div>`;
const newsletter = (issue, title, lines) => `<div class="newsletter-mast">THE SCHOOL NEWSLETTER <span>${issue}</span></div><strong>${title}</strong><div class="newsletter-rule"></div><p>${lines}</p><div class="newsletter-columns"><span>DATES<br>Mon · Wed · Fri</span><span>PLEASE NOTE<br>Forms · clubs · trips</span></div>`;
const chat = (title, a, b, c) => `<div class="chat-head"><span class="chat-avatar"></span><strong>${title}</strong><span>⌕</span></div><div class="chat-bubble">${a}<small>16:42</small></div><div class="chat-bubble outgoing">${b}<small>16:44</small></div><div class="chat-bubble">${c}<small>16:46</small></div>`;
const sms = (name, a, b) => `<div class="sms-head">‹ <strong>${name}</strong></div><div class="sms-bubble">${a}</div><div class="sms-bubble sent">${b}</div><div class="sms-entry">Text message&nbsp;&nbsp; +</div>`;
const invite = (kicker, title, detail) => `<small>${kicker}</small><strong>${title}</strong><span>${detail}</span><i aria-hidden="true"></i>`;
const flyer = (kicker, title, detail) => `<small>${kicker}</small><strong>${title}</strong><span>${detail}</span><div class="flyer-footer">ALL FAMILIES WELCOME</div>`;
const fixture = (title, rows) => `<div class="fixture-head">${title}</div><table><tbody>${rows.map(([day,where,time])=>`<tr><td>${day}</td><td>${where}</td><td>${time}</td></tr>`).join('')}</tbody></table>`;
const appointment = (kind, time, note) => `<small>${kind}</small><strong>${time}</strong><span>${note}</span><div class="appointment-line"></div>`;
const schedule = (title, rows) => `<div class="schedule-head">${title}</div>${rows.map(([time,activity])=>`<div class="schedule-row"><b>${time}</b><span>${activity}</span></div>`).join('')}`;
const form = (title, detail) => `<div class="form-head">SCHOOL OFFICE <span>RETURN BY FRIDAY</span></div><strong>${title}</strong><p>${detail}</p><div class="form-check">□ I give permission&nbsp;&nbsp; □ Please contact me</div><div class="signature">Signed: __________________</div>`;
const payment = (title, amount, detail) => `<div class="payment-head">PAYMENT REMINDER</div><strong>${title}</strong><span>${amount}</span><p>${detail}</p>`;
const notification = (app, title, detail, time='now') => `<div class="notification-dot"></div><div><small>${app} · ${time}</small><strong>${title}</strong><span>${detail}</span></div>`;
const hand = (title, detail) => `<strong>${title}</strong><span>${detail}</span>`;
const list = (title, rows) => `<strong>${title}</strong>${rows.map(row=>`<span>□ ${row}</span>`).join('')}`;
const club = (name, subject, detail) => `<div class="club-head">${name}</div><strong>${subject}</strong><p>${detail}</p><small>Sent to parents · 18:04</small>`;
const item = (format, content, desktop, mobile, variant='') => ({format,content,desktop,mobile,variant});

const items = [
  item('newsletter', newsletter('ISSUE 18', 'This week at school', 'A note about the trip, dates for the term and a change to next week’s assembly.'), [8,-5,292,-9,1], [-24,-4,230,-9]),
  item('email', mail('School office', 'Year 2 trip information', 'Please read the attached letter and return the consent form.'), [-7,8,292,-5,7], [-16,7,242,-6]),
  item('notification', notification('School app','New message','A letter has been added to your inbox','08:42'), [55,1,212,7,12], [48,2,173,8]),
  item('flyer', flyer('COMMUNITY NOTICE','SUMMER FAIR','Saturday · 11 am–3 pm'), [65,7,220,10,2], null,'fair'),
  item('chat', chat('Parents group','Can anyone cover pick-up?','I’m at work until five.','The time has changed again.'), [51,17,234,8,8], [46,18,193,8]),
  item('invite', invite('YOU’RE INVITED','A birthday party!','Saturday · 2 pm · Please reply'), [25,22,235,-8,11], [30,25,198,-9],'party'),
  item('appointment', appointment('GP REMINDER','Tuesday, 3:40','Please arrive ten minutes early'), [-12,25,208,8,8], [-16,31,173,8]),
  item('fixture', fixture('FOOTBALL FIXTURES',[['Sat 14','Home','10:30'],['Sat 21','Away','09:15'],['Sat 28','Home','11:00']]), [-10,36,280,-7,2], [-22,38,226,-8]),
  item('form', form('Trip permission slip','Year 2 visit · museum · packed lunch required'), [41,40,260,6,4], [35,45,215,7]),
  item('notification', notification('Calendar','Time changed','Football now starts at 10:30','2 min ago'), [35,11,224,-11,13], [12,14,189,-12],'changed'),
  item('sms', sms('Alex','Can you do the pick-up on Thursday?','I’ll check and get back to you.'), [4,48,220,-9,10], [-8,52,186,-10]),
  item('newsletter', newsletter('PAGE 2', 'Important dates', 'Class photos, PE days and the end-of-term concert. Please check the times.'), [67,53,245,11,2], null,'inner'),
  item('schedule', schedule('THIS EVENING',[['16:15','Dentist'],['17:30','Swimming'],['18:45','Music practice']]), [17,59,210,8,7], [-10,65,192,7]),
  item('hand', hand('PE kit tomorrow!', 'and the water bottle'), [62,69,180,-11,12], [51,73,155,-11]),
  item('notification', notification('Club update','Session cancelled','Coach is unwell today','18:01'), [44,30,218,-5,14], [43,36,186,-6],'urgent'),
  item('email', mail('After-school club', 'Collection arrangements', 'Please confirm who is collecting on Friday.'), [-18,65,272,-11,3], null),
  item('payment', payment('School trip','£12.50','The payment link is in the school email.'), [55,29,196,9,9], [52,32,169,10]),
  item('list', list('Bring for the trip',['packed lunch','waterproof coat','comfortable shoes']), [1,76,180,-8,10], [-6,78,157,-8]),
  item('sms', sms('Play date','Is Sunday afternoon still okay?','Yes — what time should we bring them?'), [66,83,218,9,6], null),
  item('notification', notification('Dentist','Appointment tomorrow','Check-in at 4:15 pm','17:24'), [12,3,190,5,10], [5,2,169,5]),
  item('flyer', flyer('SCHOOL EVENT','WINTER CONCERT','Thursday · Main hall · 6 pm'), [7,17,207,-12,3], null,'concert'),
  item('club', club('SWIM CLUB','Lanes have changed','Please use the side entrance from this week.'), [70,22,230,11,4], null),
  item('notification', notification('Messages','New reply','Who is doing drop-off?','now'), [-12,55,198,7,14], [-14,60,169,7]),
  item('form', form('Consent form','Please sign and return before the visit.'), [47,76,240,-8,3], null,'small'),
  item('hand', hand('Book the dentist', 'after school if possible'), [35,83,164,13,12], [28,82,145,12]),
  item('newsletter', newsletter('PAGE 3','Club news','New timetable, kit reminders and a note from the office.'), [-12,86,251,7,1], null,'inner'),
  item('fixture', fixture('WEEKEND GAMES',[['Sun 08','Eastfield','09:00'],['Sun 15','North Park','10:00']]), [66,37,234,-9,5], null),
  item('invite', invite('SAVE THE DATE','Pool party','Reply by next Wednesday'), [63,61,192,12,8], [60,61,165,11],'pool'),
  item('notification', notification('School app','Action needed','Please check the trip letter','09:03'), [3,33,213,5,14], [5,42,182,5]),
  item('schedule', schedule('CLUB PICK-UPS',[['Mon','Football 17:00'],['Wed','Drama 16:30'],['Fri','Swimming 18:00']]), [31,47,205,-12,5], null),
  item('list', list('Before Friday',['return form','buy present','check boots']), [74,73,160,-6,9], [55,68,144,-6]),
  item('email', mail('Your dentist','Appointment reminder','Please confirm your visit on Thursday at 4:15.'), [47,6,255,-10,3], null),
  item('notification', notification('Club chat','Change of venue','Training is at the other pitch','17:58'), [26,72,210,9,15], [25,72,179,9],'changed'),
  item('club', club('DRAMA CLUB','Rehearsal this week','Children should bring their scripts on Wednesday.'), [2,61,210,-12,4], null),
  item('payment', payment('Lunch account','Low balance','Please top up when you can.'), [76,48,190,8,10], [60,48,170,8]),
  item('sms', sms('Grandad','Happy to collect after swimming. Which entrance?','I’ll send the details.'), [22,91,208,-6,5], null),
  item('notification', notification('Reminders','Tonight','Check tomorrow’s bags','19:10'), [50,89,204,7,13], [45,88,177,7]),
  item('flyer', flyer('CLUB NOTICE','NEW TERM','Registration closes Friday'), [77,91,195,-9,1], null,'club-flyer'),
  item('hand', hand('Where’s the letter?', 'check the school bag'), [-8,93,169,11,12], [1,91,152,10]),
  item('notification', notification('Family chat','New message','Can someone take the present?','now'), [69,-4,192,-7,13], [62,-3,165,-7])
];

export function renderCollage() {
  return `<div class="incoming-collage" aria-hidden="true">${items.map(({format,content,desktop,mobile,variant}) => {
    const [x,y,w,r,z]=desktop;
    const mobileStyle=mobile ? `--mx:${mobile[0]}%;--my:${mobile[1]}%;--mw:${mobile[2]}px;--mr:${mobile[3]}deg;` : '';
    return `<div class="incoming incoming-${format}${variant ? ` incoming-${variant}` : ''}${mobile ? '' : ' mobile-hide'}" style="--x:${x}%;--y:${y}%;--w:${w}px;--r:${r}deg;--z:${z};${mobileStyle}">${content}</div>`;
  }).join('')}</div><div class="incoming-taper" aria-hidden="true"><div class="incoming incoming-notification incoming-taper-top">${notification('School app','New message','Please check tomorrow’s arrangements','now')}</div><div class="incoming incoming-notification incoming-taper-middle">${notification('Family chat','Pick-up changed','Can you collect at half past four?','12:18')}</div><div class="incoming incoming-hand incoming-taper-note">${hand('Return the form', 'before Friday')}</div><div class="incoming incoming-list incoming-taper-list">${list('This week',['PE kit','party reply'])}</div><div class="incoming incoming-hand incoming-taper-bottom">${hand('Swimming kit?', 'check the bag tonight')}</div></div>`;
}
