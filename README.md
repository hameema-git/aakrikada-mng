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
