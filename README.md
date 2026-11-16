# Aakrikada / KSMA demo (website + membership system)

One page app, no backend. Node.js is the only thing you need installed.

## Run it (two terminals in VS Code)

**Terminal 1 – the website**

    npm start

(`npm install` is not needed. Windows may ask to allow Node through the firewall: click Allow.)
It prints `http://localhost:5173`. Keep this terminal running.
If port 5173 is already used (for example by another demo), it picks the next free port and prints the address. Use that port in the tunnel command below.

**Terminal 2 – public link for WhatsApp / the client's phone**

    winget install --id Cloudflare.cloudflared -e
    cloudflared tunnel --url http://localhost:5173

Close and reopen the terminal after the install if `cloudflared` is not recognised.
It prints a link like `https://something-random.trycloudflare.com`. Send that link.

## Demo logins (password for all: demo123)

| Role | Mobile |
|---|---|
| Member (active) | 9000000001 |
| Member (renewal due) | 9000000003 |
| Local committee (Pala) | 9000000010 |
| District committee (Kottayam) | 9000000020 |
| State committee | 9000000030 |
| System admin | 9000000040 |

More district and local accounts are listed under "More committee accounts" on the login page.

## Things to know

- Data lives in the browser's memory. Each visitor gets their own fresh copy, and it resets on refresh.
  Approvals made on your laptop will NOT appear on the client's phone. That needs the Django backend.
- Each tunnel run gives a new random link. The link works only while both terminals are running.
- The install button (bottom of the page) works on the https link. On iPhone use Share > Add to Home Screen.
- Vendors, members, notices and payments are demo data. Placeholder tags mark sample content.

## Want a link that stays up without your laptop?

The `public` folder is a complete static site. You can upload it to a free static host
(for example Cloudflare Pages "Direct Upload" or Netlify Drop) to get a permanent https link.

## Files

- `public/index.html` – the whole site and membership system
- `public/manifest.webmanifest`, `public/sw.js`, `public/offline.html`, `public/icons/` – installable app (PWA)
- `server.js` – small local web server

## Brand assets and sources

- Logos, colours and the certificate layout come from the files supplied by the client
  (Aakri Kada logo, KSMA State Committee letterhead, membership certificate).
- State committee names and phone numbers come from the letterhead. Contact details for Aakri Kada customer care come from aakrikada.in.
  Please ask the client to confirm both before launch.
- Signatures are NOT reproduced on the digital certificate; the signature lines are left blank.
- Photos: none were available, so pages use the logos only. Replace with real photos when supplied.

## Committee photos

Put portrait photos in `public/images/committee/` (square, about 400 px). In `public/index.html` find `OFFICERS`
and set each person's `photo` to the file path, for example `photo:'/images/committee/president.jpg'`.
Until then the cards show initials.

## Committee portraits (updated)

Five portraits are in `public/images/committee/photo-1.jpg` ... `photo-5.jpg` (upload order). They are also embedded in `index.html` as `IMG.p1` ... `IMG.p5`.
In `public/index.html` find `PHOTO_MAP` and set who is who, for example `president:'p3'`. Until then the cards show initials.
The 9 other steering committee members and the 28 executive members are in `STEERING_MORE` and `EXECUTIVE`: replace each `null` name with `{en:'Name'}` and set the designation.
