const fs = require('fs')
const path = require('path');

export async function GET() {
    /* const today = new Date();

    console.log(today);  // This will give you the full Date object with time and other details

    // To get specific parts of the date:

    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-indexed (January is 0)
    const day = today.getDate();

    console.log(`${year}-${month}-${day}`); */
    let title = "New Opportunity 123! d'enfat!@";

// Supprimer les espaces au début et à la fin, convertir en minuscules et remplacer les caractères indésirables par des tirets
title = title.trim().toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '');

console.log(title);
    return new Response(JSON.stringify({ "Today": title }))
}

export async function POST(req) {
    const {blogData} = await req.json()
    const today = new Date();
    // To get specific parts of the date:

    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-indexed (January is 0)
    const day = today.getDate();

    const date = `${year}-${month}-${day}`;
    const tags = blogData.tags.split(',')
    let i= ''
    let header = `---
title: "${blogData.title}"
description: "${blogData.description}"
image: "../../public/blogs/${blogData.image}"
publishedAt: "${date}"
updatedAt: "${date}"
author: "${blogData.author}"
isPublished: ${true}
tags: `
for (const tag in tags){
i+= '- '+tags[tag]+'\n'
}
const body = `
${i}
---


${blogData.content}
    `
const content = header+body
console.log(content)
    const directoryPath = path.join('content', blogData.title.trim().toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/^-+|-+$/g, ''));

// Créer le dossier s'il n'existe pas
fs.mkdir(directoryPath, { recursive: true }, (err) => {
  if (err) throw err;

  // Écrire le fichier MDX
  const filePath = path.join(directoryPath, 'index.mdx');
  fs.writeFile(filePath, content, (err) => {
    if (err) throw err;
    console.log(`Le fichier ${blogData.title} a été créé avec succès !`);
    return new Response(JSON.stringify({"message":`Le fichier ${blogData.title} a été créé avec succès !`}))
  });
});
    return new Response(JSON.stringify(blogData))
}