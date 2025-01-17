This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Brevo

[Documentation du SDK TypeScript Brevo](https://github.com/getbrevo/brevo-node?tab=readme-ov-file#brevo-typescript)

### Etape 1

Installer le package `@getbrevo/brevo` :

```bash
npm i @getbrevo/brevo --save
```

### Etape 2

Créer un template de mail dans Brevo.

Pour ajouter des variables, il faut écrire `{{params.nom_variable}}`, par exemple `{{params.email}}` pour l'email.

### Etape 3

Créer une route `/api/brevo` par exemple :

```tsx filename="app/api/brevo/route.tsx"
"use server";

import { NextRequest, NextResponse } from "next/server";
import {
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
} from "@getbrevo/brevo";

export async function POST(request: NextRequest) {
  // Get body request
  const { email, message } = await request.json();

  //  Vérification du formulaire

  // Appel de l'API Brevo
  const BREVO_API_KEY = process.env.BREVO_API_KEY;

  if (!BREVO_API_KEY) {
    return NextResponse.json(
      {
        message: "Brevo API key manquant",
      },
      { status: 400 }
    );
  }

  const apiInstance = new TransactionalEmailsApi();

  // Configure API key authorization: api-key

  apiInstance.setApiKey(TransactionalEmailsApiApiKeys.apiKey, BREVO_API_KEY);

  const sendSmtpEmail = {
    to: [
      {
        email: "votre@email.com",
        name: "Votre nom",
      },
    ],
    templateId: 1, // Adapter l'id du template
    params: {
      email: email, // Remplacemenet de la variable 'params.email'
      message: message.replace(/\r\n|\r|\n/g, "<br />"), // Remplacemenet de la variable 'params.message'
    },
    replyTo: { email: email },
    subject: "Prise de contact depuis le portfolio",
    tags: ["portfolio"],
  };

  try {
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    return NextResponse.json(response);
  } catch (error) {
    console.log("Error sending email:", error);

    return NextResponse.json(
      {
        message: "Une erreur s'est produite, voilà mon email : votre@email.com",
      },
      { status: 400 }
    );
  }
}
```

### Etape 4

Appeler cette route côté front :

```tsx filename="app/page.tsx"
// ...
fetch("/api/brevo", {
  method: "POST",
  body: JSON.stringify(form),
})
  .then((sent) => {
    if (sent.status < 300) {
      // Formulaire envoyé avec succès
    } else {
      // Afficher le message d'erreur
    }
  })
  .catch((error) => {
    // Afficher le message d'erreur
  });
// ...
```
