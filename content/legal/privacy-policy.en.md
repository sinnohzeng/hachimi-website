# Privacy Policy: Hachimi.ai (哈基米道长)

**Last updated: 2026-10-01**

Hachimi.ai ("the App", "we", "us") is operated by **Yuenchuk Investment Limited**, a company registered in Hong Kong ("the Company"). This policy covers both the iOS and the Android versions of the App. It explains what data the App processes, why, where it is kept and for how long, and what rights you have.

**Please understand how the App works first.** Zi Wei Dou Shu and Ba Zi charts are calculated by an engine built into the App, on your device. When you give two numbers and write what you want to ask, the App also casts a Mei Hua Yi Shu hexagram on your device. When you ask Hachimi for a reading, the App sends your question and the cast to the Company's backend; the backend recomputes the cast with the same casting algorithm to check it, then forwards the question and hexagram to a third-party AI service, **DeepSeek**, which writes the reading. Pattern analysis, Zi Zhan and the Four Pillars lookup are calculated by the backend in real time. The sections below set out what each kind of request carries and how long it is kept.

## 1. Summary

- No account is needed. The App tells installations apart with a randomly generated **anonymous install identifier**, which you can reset at any time under Me > Privacy and data.
- Online readings need your consent first. Once you agree, your question, clarification and the reading are stored on the Company's backend together with the anonymous install identifier, and the text is **deleted after 90 days**. We use it to improve reading quality.
- Cases, reading history and Hachimi's memory are stored on your device. On iOS they sync through iCloud to your own iCloud; the Android version has no cloud sync and is saved to your Google Account with the system backup.
- We do not sell your data, do not use it for advertising, and do not track you across other apps or websites. The App does not read any advertising identifier, including the iOS IDFA and the Android advertising ID, so it never shows an App Tracking Transparency request.
- The App integrates no third-party analytics, advertising or crash-reporting SDK. Usage statistics and crash diagnostics go only to the Company's backend.

## 2. Data we process

| Data | Purpose | Leaves your device? | Where it is kept, and for how long |
|---|---|---|---|
| Your question and clarification | To generate the reading; to improve reading quality | Yes: sent to the Company's backend for an online reading and forwarded by the backend to DeepSeek | Kept on the backend with the anonymous install identifier, text deleted after 90 days; on your device it stays in your reading history |
| Scenario (find an item, love, career, or open question) | Sets the focus of the reading | Yes: sent with the question and written into the prompt for DeepSeek | Kept with the question record; see §4 |
| The two cast numbers, casting time and time zone | Casting on your device; the backend recomputes the cast to check it | Yes: sent with the question to the Company's backend | Kept with the question record; the time zone is deleted after 90 days, the rest per §4 |
| Feedback on a reading (thumbs up or down) | Measures reading quality | Yes: uploaded once you have agreed to online readings | The backend keeps only the vote, with no text, long term |
| Anonymous install identifier (randomly generated on first launch) | Enforces the daily reading allowance; links one installation's events to follow quality trends; limits abuse | Yes: sent with online readings, feedback, usage statistics, pattern analysis, Zi Zhan and the Four Pillars lookup | Cleared from question records after 90 days; deleted from admission records and usage statistics after 8 days. You can reset it at any time |
| Usage statistics (daily counts of events such as opening the App, seeing a reading, leaving a cast midway, opening history, using export and turning memory on or off, plus platform and App version) | To understand how features are used | Yes: uploaded when the App comes to the foreground, with the anonymous install identifier | Records carrying the identifier are deleted after 8 days; daily totals without it are kept long term |
| Crash and hang diagnostics (iOS only) | To find and fix crashes | Yes: uploaded after the system delivers a diagnostic; only call stacks, exception type, OS and App version, without the anonymous install identifier | Raw diagnostics deleted after 90 days; daily counts kept long term |
| Hachimi's memory: memory episodes and focus profile | Lets readings pick up threads you asked about before | While memory is on, part of it goes with that request through the backend to DeepSeek; fields in §3.1. Notes you add are not sent | Kept on your device with your reading history; Company servers do not store it |
| Chart summary of the selected person | Lets the reading take the chart you chose into account | Sent through the backend to DeepSeek with that request when you select a person; fields in §3.1. Names, birth details and birthplace are not sent | Not stored on the backend |
| Birth details for pattern analysis: Gregorian birth date and time with birthplace longitude and time zone, or a lunar date, or the four pillars; gender | To calculate that person's pattern | Yes: sent to the Company's backend when you open the pattern analysis page, with the anonymous install identifier; names and birthplace names are not sent | Calculated and returned; not stored |
| The eight characters you enter for a Four Pillars lookup | To find possible birth times | Yes: sent to the Company's backend with the anonymous install identifier | Calculated and returned; not stored |
| Zi Zhan method, the number you give, the current time and your longitude | To cast a Zi Zhan chart; corrected to true solar time when "Use current location" is on | Yes: sent to the Company's backend with the anonymous install identifier; longitude is sent only when you turn on "Use current location" | Calculated and returned; not stored |
| Reports: a snapshot of the reported reading, the reason and an optional note | Lets you flag a reading that upset you, for human review | Only when you report a reading; sent to the Company's backend without the anonymous install identifier or your question, carrying that reading's event number | Whole row deleted after 30 days. While kept, the event number can be matched to that reading's original question |
| Admission records: anonymous install identifier, the cast's number, scenario and date | Connects a cast to the reading that follows; enforces the daily limit | Created by the backend for an online reading | Deleted after 8 days; the daily count is a single number, kept 2 days |
| Membership credentials (iOS: the App Store signed transaction; Android: the subscription product ID and Google Play purchase token) | To tell whether you are a member | Yes: see §4.2 | See §4.2; never written into question records |
| Cases: names, gender, birth details, birthplaces, notes | Charts on your device | Never uploaded as a whole; birth details are sent only for pattern analysis, as in the row above | Kept on your device; the iOS version also syncs them to your iCloud, see §4.3 |
| Reading history: casts, questions, readings, outcomes and notes | Looking back | Never uploaded as a whole; a question is sent only for an online reading, as in the first row | Kept on your device; the iOS version also syncs it to your iCloud, see §4.3 |
| Intimacy matching | Estimates how two people tend to get along, from the cases' birth details, on your device | No | Not stored separately |
| Language and preferences | App preferences | No | Kept on your device; on iOS some settings sync through iCloud |

Company servers do not store the names, birth details or birthplaces of your cases, and receive no email, contacts, photos or advertising identifier.

**On health and finances**: the App does not read HealthKit, Health Connect, medical records, bank accounts or any structured health or financial data, and never asks you for any. But what you write is free text, and you may mention your body, a doctor's visit, your salary, a loan or something else sensitive. Those words are handled as "your question": forwarded to DeepSeek under §3 to generate a reading, kept and deleted under §4. Write only what you are willing to write; you do not need to add details you would rather keep to yourself just to get a sharper answer.

### 2.1 Location, microphone and photos

- **Location** is used only for Zi Zhan. After you turn on "Use current location" on the Zi Zhan page and allow it in the system prompt, the App reads your location once and uses only the longitude; latitude is neither read nor stored. The longitude goes to the backend with that one Zi Zhan request to set the chart to true solar time, and is discarded once the chart is calculated. iOS gives approximate location by default; if you choose precise location in the system prompt, the longitude sent is precise. The Android version asks only for approximate location. The App never uses location in the background.
- **Microphone** is used only to turn what you say into the text of your question. Recognition runs on your device; the audio is neither uploaded nor saved, and the recognised text is handled like text you type.
- **Photos**: the iOS version writes to your photo library only when you save a share image, and never reads it.

## 3. Third-party AI readings and consent

For an online reading, the Company's backend receives your question and clarification, scenario, the two numbers and the cast checksum, casting time and time zone, language, the anonymous install identifier and a request identifier, the consent version and your membership credentials. It uses them to check the cast, prevent abuse and generate the reading. When memory is on or a person is selected, it also receives what is listed below.

### 3.1 What is sent to DeepSeek

Readings are currently generated by **DeepSeek Open Platform (DeepSeek)**. The backend forwards:

- your question and clarification, scenario, output language, the hexagram and hour index; the exact casting time, with time zone and local time, plus the matching year, month, day and hour pillars and the calendar rule version.
- When memory is on and not paused for the selected case: that case's question statistics, meaning the themes asked most often, how many times and from how many days ago; up to three past questions, each with a summary, theme, days elapsed, hexagram number and the outcome you recorded (went well or not); up to eight pieces of profile evidence, each with theme, content, whether you said it or it was inferred, days elapsed, and whether you corrected it.
- When a person is selected: the natal four pillars, day master, yin or yang, strength, pattern, seasonal balancing element, gender and ten-year age band; the current Da Yun period's status, pillars and start and end times; the birth time's time zone offset and its source, and the precision of the birth details; the hidden-stem allocation rule, the year boundary and the calendar rules; the engine version.

The backend does not forward the original two numbers, any case's name, birth details or birthplace, the anonymous install identifier or request identifier, membership credentials, consent records or the notes you add. Whatever you write in the question or clarification is sent as written, so please leave out real names, contact details and addresses.

Although the chart summary contains no raw birth details, the four pillars, Da Yun dates and time zone offset can still narrow down an approximate birth time, so it should not be treated as anonymous.

DeepSeek handles what it receives under its open platform terms; whether it is used for training and how long it is kept depend on those terms and on the Company's account settings on that platform. Requests sent to DeepSeek do not carry your anonymous install identifier, so we cannot locate and delete a particular request on your behalf. If the recipient, the content sent or the purpose changes, we will update this explanation and ask for your consent again.

### 3.2 Permission and withdrawal

Tapping Get Started on first launch only opens the App; it does not mean you agree to online readings. The first time you ask for an online reading, the App explains what data is sent, what it is for and that it goes to DeepSeek, and you choose Agree and Enable Online Readings or Not Now. Once you have agreed to a version of that explanation, you are not asked again. Without your agreement, the App sends no online reading request. If you give only the numbers and no question, the App casts a plain hexagram on your device, without calling DeepSeek, needing online reading permission or using memory.

Under Me > Privacy and data > Privacy Policy you can open the full policy and see your current permission. If you have agreed, the bottom of the page has Stop Online Readings and Withdraw Consent; if you have not, the page has no button to turn it on. After you withdraw, the App sends no new reading requests and no thumbs up or down. A reading you are waiting for ends there; your draft stays, and a reading that arrives later is not saved to history. We cannot guarantee to recall requests already sent, and records already on the server are deleted on their normal schedule. Reports are not affected. Usage statistics and iOS crash diagnostics do not depend on this permission and are handled as listed in §2.

Withdrawing does not delete your reading history and does not affect offline charts or data on your device. To use online readings again, tap Agree and Enable Online Readings on the explanation page when you next ask a question.

## 4. Backend and data retention

- **Hosting**: the Company's backend runs on Cloudflare Workers, and its database is Cloudflare D1. Cloudflare processes this data on our behalf as our hosting provider.
- **Server logs**: the Cloudflare platform records metadata for each request and response, such as time, path, status and duration, which may include your IP address. Pattern analysis, Zi Zhan and the Four Pillars lookup also log one line with the anonymous install identifier and the duration. Logs we write contain nothing you typed. Logs are kept for at most 7 days, for troubleshooting and abuse prevention.
- **IP addresses** are used to limit request rates and are not written to the database.
- **Question records**: for each online question that produced a reading, the question, clarification, scenario, hexagram and reading are stored in the Company's database together with the anonymous install identifier. This collection comes with online reading permission and has no separate switch. You can withdraw permission, or reset the anonymous identifier under Me > Privacy and data, after which old records no longer match the App on your device.
- **Purposes**: improving reading quality with real unsatisfying samples, making follow-up questions and the understanding of questions more accurate, and refining how each scenario is handled.
- **Deleted after 90 days**: once a question record is 90 days old, a daily scheduled task clears its question, clarification, reading, time zone and anonymous install identifier. What remains contains none of your words or the reading and no install identifier; it keeps the event number, the two cast numbers and the casting time, the hexagram, scenario, language, model used, duration, memory counts and that reading's thumbs up or down, to follow long-term quality trends.
- **Evaluation samples**: our staff read a small number of thumbs-down questions and readings to pick internal evaluation material. Selected ones are rewritten into synthetic cases with the same meaning before entering the evaluation set; your original words are not kept.
- **Safety stops**: if what you write touches on a crisis, physical or mental health, or financial hardship, the backend recognises it before calling DeepSeek, and the App switches to a static information page without generating a reading; the question is then neither sent to DeepSeek nor stored. If the reading DeepSeek generates touches on these topics itself, the App switches to the same page, the generated text is discarded, and only an admission record is kept, deleted after 8 days.

### 4.1 Hachimi's memory (kept per case)

- Each case builds its own memory episodes and profile; casts not linked to a case build no profile. During an online reading, the AI may suggest a few observations about that case based on what you wrote this time; the App checks their source, freshness and consistency on your device before recording them under that case. They are guesses, not conclusions. You can view, correct, delete or set aside any one of them, pause memory for a case, or turn memory off entirely.
- A reading sends only the part listed in §3.1. Anything expired, contradictory, whose source has been deleted, or that you set aside is not sent. No memory is sent for a cast not linked to a case, with memory off, or while that case's memory is paused.
- When you delete a case, your reading history keeps the name it had at the time by default, and its memory is cleared. You can filter your history by that deleted case and clear those readings together. Deleting a history entry also removes its memory episode and any profile evidence left without a source.

### 4.2 Membership and subscriptions

- **Apple or Google handles payment**: on iOS, membership is bought through Apple's in-app purchase; on Android, through Google Play billing. Your name, email, card and billing address are handled by Apple or Google; the Company neither receives nor stores them.
- **Membership check on iOS**: when you ask a question as a member, the App sends the App Store signed transaction with the request. The backend takes Apple's original transaction ID, product and expiry from it, queries Apple's App Store Server API for the subscription status when needed, and caches the result for at most 15 minutes.
- **Membership check on Android**: each time the App starts, after a purchase, and when you ask a question as a member, the App sends the subscription product ID and the Google Play purchase token to the backend. The backend verifies them with the Google Play Developer API and keeps a SHA-256 digest of the purchase token, together with the membership state, until the current subscription period ends.
- Membership credentials are not written into question records and are not linked to anything you write.
- **Membership follows your store account**: on iOS your membership belongs to your Apple Account, on Android to your Google Account, and each store restores it on a new device or after a reinstall. Memberships on the two platforms are counted separately and do not carry over.

### 4.3 On-device data, iCloud sync, system backups and deletion

- **iCloud sync on iOS**: cases, reading history, case categories, case library settings and some preferences sync through Apple's CloudKit to the private iCloud storage of your own Apple Account, so your devices see the same data. Apple keeps this data under the iCloud terms; the Company cannot read it. To turn sync off, go to Settings > your name > iCloud on your iPhone and switch off Hachimi.ai. While sync is on, anything you delete on one device is also deleted on your other devices and in iCloud.
- **System backups**: on iOS, reading history, cases and settings are included in iCloud device backups and computer backups; on Android, they are included in the system backup and device-to-device transfer under your Google Account. The anonymous install identifier is in the backup too and is kept after a restore; you can reset it again. Apple or Google keeps these backups; we cannot see them.
- **Short-lived data on the device only**: input drafts older than 30 days are cleared the next time they are read; drafts, caches, pending usage statistics and the case library's daily automatic backups are not included in system backups. A reading you are waiting for exists only in memory and is not resent after the App quits.
- **Deleting in the App**: Me > Privacy and data > Delete All Reading Data clears your reading history, memory episodes, profile and drafts; on iOS with sync on, the iCloud copy is deleted too. Cases are deleted one by one in the case library. Deleting in the App does not remove existing system backups.
- **Deleting backups and cloud copies**: on iPhone, go to Settings > your name > iCloud > Manage Account Storage, where you can delete device backups and the Hachimi.ai data stored in iCloud; on Android, manage backups in the system's backup settings or in Google One. Uninstalling the App removes only the data on the device, not the copy in iCloud or existing backups.

## 5. Your rights

Depending on the law where you live, such as the GDPR in the EU or EEA, the CCPA/CPRA in California or the PDPO in Hong Kong, you have the right to access, correct and delete your personal data, to object to or restrict processing, and to withdraw consent at any time.

- **Withdraw consent**: tap Stop Online Readings and Withdraw Consent under Me > Privacy and data > Privacy Policy; see §3.2.
- **Access, portability and deletion**: the App has no accounts. We hold no name, email or similar information that would tie an anonymous install identifier to a specific person, so we cannot look up or export server records by person. The reading history and cases on your device are under your control; you can view, export and delete them in the App. Question text is deleted after 90 days; after you reset the anonymous identifier, old records no longer match the App on your device.
- **GDPR**: the legal basis for sending your question and cast to DeepSeek is your consent, which you can withdraw at any time.
- **CCPA/CPRA**: data is disclosed to DeepSeek to generate the reading you ask for. The Company does not sell your data or share it with others for cross-app advertising.
- **PDPO (Hong Kong)**: we collect data only for the purposes listed in this policy and use it for nothing else; all network requests are encrypted in transit with TLS.

For any request or question, write to the email address below. Under the GDPR we normally reply within one month, which may be extended as the law allows when a request is complex, and we will tell you if so; under the CCPA we generally reply within 45 days.

## 6. Age

The App is meant for users aged 13 and older. It is not directed to children under 13 and does not knowingly collect their personal data.

## 7. Security

All network requests use HTTPS/TLS. Keys for the upstream AI service are kept only on the Company's servers; they are never sent to or built into the App.

## 8. Changes

We may update this policy, and the "Last updated" date will change accordingly. Material changes will be shown in the App.

## 9. Contact

Yuenchuk Investment Limited, Hong Kong
Email: voice@hachimi.ai
