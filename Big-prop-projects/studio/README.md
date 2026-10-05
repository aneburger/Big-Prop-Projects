# Big Prop Projects Studio

This copy keeps your project ID df6rlsmo, production dataset, Sanity versions and CLI configuration. Originals and remote content were not modified. Nothing was deployed.

## Install

Merge this folder into your existing studio folder. Generated node_modules, .sanity and dist folders and environment secrets are excluded. Keep any existing local environment files. Run these commands from the project root:

```powershell
cd studio
npm ci
npm run dev
```

Open the URL printed by Sanity and sign in. @sanity/icons is now a direct dependency pinned to the version already in your lockfile.

## Editing projects

Open Website content → Projects and create a project:

- Title: project name.
- URL slug: click Generate after entering the title. Keep it stable after publishing links.
- Description: plain text for cards and detail pages. Over 250 characters shows a warning; 2000 is the maximum.
- Location: suburb/city, for example Brentwood Park, Benoni.
- Project date: completion/display date, used for newest-first ordering. For month-only dates, enter the first day of the month.
- Project images: ordered gallery. Drag to reorder; the first image is the cover. Add alternative text to every image and use hotspot/crop controls to choose its focal point.

All fields are required. At least one uploaded image is required; five different images are not necessary. Sanity assigns document IDs and array keys automatically and checks slug uniqueness within this document type. Click Publish when ready.

## Querying content

The queries folder contains GROQ examples for Vision:

- all-projects.groq: all projects, newest first, with images.
- recent-projects.groq: the newest four projects and cover images.
- project-by-slug.groq: one project and its gallery. Supply parameters such as {"slug":"olive-hill"}.

Select the published perspective for public content. When later configuring a frontend client, use projectId df6rlsmo, dataset production, apiVersion 2026-10-05 and perspective published. The queries do not automatically connect the existing React components: your website still uses its current data until that integration is implemented.

Images include _key, alt, crop/hotspot and asset metadata. Use _key as the React gallery key and @sanity/image-url to produce correctly sized/cropped image URLs. Raw asset URLs alone do not apply hotspot/crop choices. Format the stored YYYY-MM-DD project date as month/year in the frontend, using UTC consistently to avoid timezone shifts.

Before browser-side fetching, configure the website origins in Sanity API/CORS settings. Public reads depend on dataset visibility. For a private dataset, fetch through your backend and keep its token server-side; never expose secret tokens in VITE_ variables.

Project categories are not included because the requested fields did not include a type/category. Your existing filters remain unchanged.

## Files

schemaTypes/project.ts defines the fields, validation, previews and ordering. schemaTypes/index.ts registers the schema. structure/index.ts creates the Projects navigation. sanity.config.ts registers that structure and Vision's API version.

References: https://www.sanity.io/docs/defining-a-schema and https://www.sanity.io/docs/studio/array-type

Validation: TypeScript checking and ESLint passed in a separate local copy. No content has been uploaded or published. Studio browser interaction has not been verified.

The Studio production build also passed using installed Sanity dependencies, with autoUpdates disabled only in the temporary validation copy. The delivered sanity.cli.ts preserves autoUpdates: true; that mode needs network access to Sanity's CDN. The default auto-update build could not be checked here because the CDN request was blocked.
