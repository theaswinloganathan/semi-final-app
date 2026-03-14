# Farm Operations Backend

## Setup
1. Ensure you have **MySQL** installed and running.
2. Create a database named \`farm_db\`.
3. Update the credentials in \`backend/.env\`.
   - \`DB_HOST\`, \`DB_USER\`, \`DB_PASSWORD\`, \`DB_NAME\`
   - Add your \`GEMINI_API_KEY\` for AI Detection feature.

## Installation
\`\`\`bash
cd backend
npm install
\`\`\`

## Running the Server
\`\`\`bash
node server.js
\`\`\`
The server will run on **port 5000**. It will automatically create the required tables (\`users\`, \`trainees\`, \`farm_tasks\`, \`crops\`, \`attendance\`, \`inventory\`, \`modules\`, \`reports\`, \`settings\`) and seed a demo admin/user.

## Default Credentials
- **Admin**: username: \`admin\`, password: \`admin123\`
- **User**: username: \`user\`, password: \`user123\`
