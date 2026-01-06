# Loans with KB - Static Website

Professional mortgage lending website for Kelly. Black/White/Pink theme with clean, minimal design.

## 🎨 Brand Colors

- **Primary Black:** `#111111`
- **Background White:** `#FFFFFF`
- **Accent Pink:** `#FF3EA5`
- **Soft Gray:** `#F5F5F7`
- **Text Gray:** `#444444`
- **Border:** `#E7E7EA`

## 📁 Project Structure

```
loanswithkb-site/
├── index.html          # Home page
├── about.html          # About page
├── contact.html        # Contact form
├── privacy.html        # Privacy policy
├── assets/
│   ├── css/
│   │   └── styles.css  # All styles
│   ├── js/
│   │   └── main.js     # Navigation, form validation, interactions
│   └── img/
│       └── kb-logo.png # PLACE YOUR LOGO HERE
└── README.md
```

## 🚀 Running Locally

### Option 1: VS Code Live Server (Recommended)

1. Open this folder in VS Code
2. Install the "Live Server" extension by Ritwick Dey
3. Right-click `index.html` → "Open with Live Server"
4. Site will open at `http://127.0.0.1:5500`

### Option 2: Python HTTP Server

```bash
# Python 3
python -m http.server 8000

# Then visit: http://localhost:8000
```

### Option 3: Node.js HTTP Server

```bash
npx http-server -p 8000

# Then visit: http://localhost:8000
```

## 📸 Adding Images

### Logo
1. Save your logo as `kb-logo.png`
2. Place it in `assets/img/kb-logo.png`
3. Recommended size: 200-400px wide, transparent background (PNG)

**Logo appears in:**
- Header (all pages)
- Footer (all pages)

### Headshot
1. Save Kelly's professional headshot as `kelly-headshot.jpg`
2. Place it in `assets/img/kelly-headshot.jpg`
3. Recommended: Professional headshot, 800x800px or larger, square crop
4. Format: JPG or PNG

**Headshot appears in:**
- Hero section on home page

If images are missing, the site will show broken image placeholders. Add both before deploying.

## 📧 Updating Contact Information

Contact info appears in **TWO places only**:

### 1. Contact Page (`contact.html`)

**Lines 73-82:**
```html
<div class="contact-method">
    <h3>Email</h3>
    <p><a href="mailto:hello@loanswithkb.com">hello@loanswithkb.com</a></p>
    <p class="contact-note">Update this in contact.html</p>
</div>
<div class="contact-method">
    <h3>Phone</h3>
    <p><a href="tel:5555555555">(555) 555-5555</a></p>
    <p class="contact-note">Update this in contact.html</p>
</div>
```

### 2. Privacy Page (`privacy.html`)

**Lines 170-173:**
```html
<strong>Email:</strong> <a href="mailto:hello@loanswithkb.com">hello@loanswithkb.com</a><br>
<strong>Phone:</strong> <a href="tel:5555555555">(555) 555-5555</a>
```

**To update:**
1. Replace `hello@loanswithkb.com` with your actual email
2. Replace `(555) 555-5555` with your actual phone number
3. Update the `tel:` links (remove all non-numeric characters for `tel:`)

**Example:**
```html
<!-- If your phone is (760) 555-1234 -->
<a href="tel:7605551234">(760) 555-1234</a>
```

## 🌐 Deploying to Netlify

### Step 1: Create Netlify Account
1. Go to [netlify.com](https://netlify.com)
2. Sign up (free plan is perfect)

### Step 2: Deploy Site

**Option A: Drag and Drop (Fastest)**
1. Log into Netlify
2. Drag the entire `loanswithkb-site` folder onto the Netlify dashboard
3. Wait 30 seconds for deployment
4. You'll get a URL like `https://random-name-12345.netlify.app`

**Option B: GitHub (Recommended for updates)**
1. Create a GitHub repository
2. Push this folder to the repo
3. In Netlify: "New site from Git" → Select your repo
4. Build settings: Leave empty (static site)
5. Deploy

### Step 3: Custom Domain
1. In Netlify: Site Settings → Domain Management
2. Click "Add custom domain"
3. Enter `loanswithkb.com`
4. Netlify will give you DNS instructions

### Step 4: Enable Form Submissions
Netlify automatically detects the contact form. No setup needed!

**Form submissions will:**
- Appear in Netlify Dashboard → Forms
- Can enable email notifications
- Free tier: 100 submissions/month

## 🔧 Connecting Domain from GoDaddy

You have `loanswithkb.com` registered at GoDaddy. Here's how to point it to Netlify:

### Step 1: Get Netlify DNS Records
After adding your custom domain in Netlify, you'll see:
- **A Record:** Points to Netlify's IP (usually `75.2.60.5`)
- **CNAME Record:** Points `www` to your Netlify domain

### Step 2: Update GoDaddy DNS

1. Log into GoDaddy
2. Go to "My Products" → Domain → DNS Management
3. Update/Add these records:

| Type  | Name | Value                          | TTL  |
|-------|------|--------------------------------|------|
| A     | @    | 75.2.60.5                      | 600  |
| CNAME | www  | your-site.netlify.app          | 600  |

**Notes:**
- `@` means root domain (loanswithkb.com)
- `www` is the subdomain (www.loanswithkb.com)
- Delete any existing A or CNAME records that conflict
- DNS propagation takes 5-60 minutes

### Step 3: Enable HTTPS (Automatic)
Once DNS is connected, Netlify will automatically provision an SSL certificate (HTTPS). Wait 1-2 hours.

## 🎯 Testing Checklist

Before going live, test:

- [ ] Logo displays correctly (add kb-logo.png)
- [ ] All navigation links work
- [ ] Contact form validation works
- [ ] Form submits successfully (check Netlify dashboard)
- [ ] Mobile menu opens/closes
- [ ] All pages look good on phone/tablet/desktop
- [ ] Updated email and phone in contact.html and privacy.html
- [ ] Domain DNS pointing correctly
- [ ] HTTPS is enabled

## ✏️ Making Changes

### Content Updates
All content is in the HTML files:
- `index.html` - Hero, programs, testimonials, FAQ
- `about.html` - Mission, values, service area
- `contact.html` - Contact form and info
- `privacy.html` - Privacy policy

### Style Updates
All styles are in `assets/css/styles.css`:
- Colors are defined in `:root` variables at the top
- Easy to change theme colors globally

### After Making Changes
1. Save files
2. Test locally with Live Server
3. Push to GitHub (if using Git method)
4. Or re-drag folder to Netlify (drag/drop method)

## 📱 Features Included

✅ **Responsive Design** - Works on all devices
✅ **Mobile Navigation** - Hamburger menu
✅ **Contact Form** - Netlify-ready with validation
✅ **SEO Optimized** - Meta tags, Open Graph, semantic HTML
✅ **Accessibility** - ARIA labels, focus states, keyboard navigation
✅ **Fast Loading** - No external dependencies, optimized CSS/JS
✅ **Smooth Scrolling** - Anchor links animate smoothly
✅ **Form Success Handling** - Shows confirmation banner

## 🔒 Security Notes

- No backend required (static site = secure)
- Netlify handles HTTPS automatically
- Form submissions are protected by Netlify's spam filtering
- No user data stored client-side

## 📊 Analytics (Optional)

To add Google Analytics later:
1. Get your GA4 tracking ID
2. Add this before `</head>` on all pages:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🆘 Troubleshooting

**Logo not showing?**
- Make sure `kb-logo.png` is in `assets/img/`
- Check file name is exactly `kb-logo.png` (case-sensitive on some systems)

**Form not submitting?**
- Must be deployed to Netlify (doesn't work locally)
- Check Netlify Dashboard → Forms to see submissions

**Domain not working?**
- Wait 1-2 hours for DNS propagation
- Check DNS records in GoDaddy match Netlify instructions
- Try clearing browser cache or incognito mode

**Mobile menu not working?**
- Check browser console for JavaScript errors
- Make sure `assets/js/main.js` is loading

## 📞 Support

Built by Kaia for Kelly's mortgage business.

For technical questions about the site:
- Check browser console for errors (F12)
- Verify all files are in correct folders
- Test in different browsers

---

**Ready to deploy?** Follow the Netlify steps above and you'll be live in minutes! 🚀
