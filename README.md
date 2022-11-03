<img src="https://user-images.githubusercontent.com/73984595/195243643-fd2e5bc1-589b-462f-b54c-e66abc19e7ad.png" width="256" />

Eventron is an app for event management and discovery. It is designed to be a competitor to services such as Meetup and Facebook Events.

## Table of Contents
1. [About](https://github.com/william-herring/eventron#about)
    - [Concept](https://github.com/william-herring/eventron#concept)
    - [Planning](https://github.com/william-herring/eventron#planning)
    - [Tech stack](https://github.com/william-herring/eventron#stack)
2. [Developer Guide](https://github.com/william-herring/eventron#developer)
    - [Setup](https://github.com/william-herring/eventron#setup)
    - [Documentation](https://github.com/william-herring/eventron#documentation)

<h2 id='about'>About</h2>
<h3 id='concept'>Concept</h3>
<p>
Eventron has been built as a social platform for engaging in virtual and in-person events. It aims to centralize the event management software industry, to provide consumers with a go-to option for event organisation and discovery. In this first prototype, the focus has been on making events easy to create, discover and join. Eventron is community-driven; meaning that an event's discoverability is linked to what community category it is under. Users can join communities to discover events matching their interests. Communities are decided by Eventron administrators, and can be adjusted if their is enough support for new communities. Suggested communities are:
<ul>
    <li>General</li>
    <li>Sports</li>
    <li>Meet-and-Greets</li>
    <li>Conventions and Exhibits</li>
    <li>Festivals</li>
    <li>Competitions</li>
</ul>
</p>

<h3 id='planning'>Planning</h3>
Before commencing development of Eventron, a comphrehensive design document and timeline was created. These can be accessed via the following links: <br><br>
<ul>
    <li><a href='https://docs.google.com/document/d/1dpO2zW3C1RsBffR5z_qK9FPLazOCuV9Z1QbPeqrYSuE/edit?usp=sharing'>SRS document</a></li>
    <li><a href='https://panoramic-bosworth-c39.notion.site/c95dc78e019e4f6cbad3bdd1f410bc87?v=e9027655fd6d4228b5dfbe8c9272f7b0'>Gantt chart</a></li>
</ul>

<h3 id='stack'>Tech stack</h3>
The following technologies were used to build Eventron: <br><br>
<table>
  <tr>
    <th>Technology</th>
    <th>Use</th>
  </tr>
  <tr>
    <td>Next.js</td>
    <td>Web framework</td>
  </tr>
    <tr>
    <td>TypeScript</td>
    <td>Programming language</td>
  </tr>
    <tr>
    <td>NextAuth</td>
    <td>Authentication</td>
  </tr>
    <tr>
    <td>TailwindCSS</td>
    <td>Inline CSS utility</td>
  </tr>
  <tr>
    <td>PostgreSQL</td>
    <td>Database</td>
  </tr>
  <tr>
    <td>Prisma</td>
    <td>ORM</td>
  </tr>
</table>
<h2 id='developer'>Developer Guide</h2>
<h3 id='setup'>Setup</h3>
<ol>
<li>Clone the repository with any of the methods outlined by clicking the green 'Code' button at the top of this page.
<li> Install latest version of Node.js and download/run <a href='https://www.postgresql.org/'>PostgreSQL</a>. Ensure to create a new database.
<li> Once Postgres server is running, edit the file '.env' and replace the DATABASE_URL field as follows: <br>
<code>DATABASE_URL="postgresql://[username]@localhost:5432/[database_name]"</code>
<li>Run 'npm install' on the command line inside the eventron folder.
<li>Run 'npx prisma db push' followed by 'npx prisma studio'. A new browser window will appear.
<li>Click on 'Communities' and add a record with the title 'General'. You may add other communities as well.
<li>Run 'npm run dev' and navigate to localhost:3000 in the browser to begin using the app.
</ol>
<h3 id='documentation'>Documentation</h3>
This app has been designed around the Unix Philosophy, which aims for minimalistic and modular software. As such, files are organised into subdirectories. Below are the important directories and files to take note of.<br><br>
Inside the root directory, you will find the .env file. This file stores all the environment variables the app accesses, including the OAuth testing tokens and database URL. You will also find some config files in the root directory. None of these should be edited. <br><br>
The 'pages' directory defines all possible routes for site pages. This includes the API. Any directories inside this (excluding API) are dynamic paths, meaning that the content is rendered depending on the provided path. For example, /community/[id]. _app.tsx and _document.tsx provide the root React component and template. Every page is either server-side rendered or statically generated depending on which option is most suitable. You can read more about this <a href='https://nextjs.org/docs/basic-features/pages'>here</a>.<br><br>
Inside the 'prisma' directory, you will find the schema. It will look something like this:
<pre>
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id               Int         @id @default(autoincrement())
  createdAt        DateTime    @default(now())
  email            String      @unique
  username         String      @unique
  organised        Event[]     @relation("organisers")
  communities      Community[] @relation("members")
  events           Event[]     @relation("events")
}

model Event {
  id               String      @id @default(cuid())
  organisers       User[]      @relation("organisers")
  community        Community?  @relation(fields: [communityId], references: [id])
  communityId      Int?        @default(1)
  title            String      @default("Untitled") @db.VarChar(150)
  image            String      @default("/placeholder.png")
  description      String      @db.VarChar(250)
  startDate        DateTime    @default(now())
  endDate          DateTime    @default(dbgenerated("NOW() + interval '1 day'"))
  location         String
  attendeeLimit    Int
  attendees        User[]      @relation("events")
}

model Community {
  id               Int         @id @default(autoincrement())
  title            String      @unique @db.VarChar(50)
  members          User[]      @relation("members")
  events           Event[]
}
</pre><br>
The Prisma schema speeds up the process of creating database rows and columns by acting as an Object Relational Mapper. All classes are exported as JavaScript modules by Prisma, meaning that we can easily model data in code. <br><br>
The 'public' directory includes images, assets and anything static that must be accessed by the client. Not much more to it than that.<br><br>
The 'components' directory stores all modular React components. Components are easy to reuse, which saves time when building layouts. <br><br>

Important code is commented in places where necessary, although variable names and functions have been designed to appear as readable as possible.