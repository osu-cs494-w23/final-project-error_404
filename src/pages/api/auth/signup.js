import { connectToDB } from "../../../../lib/db";
import { hashPassword } from "../../../../lib/passwordHash";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { username, email, password } = data;


  console.log(username);
  if (
    !username ||
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message: "Invalid input - Password must be at least 7 characters",
    });

    return;
  }

  const client = await connectToDB();
  const db = client.db();

  const hashedPassword = await hashPassword(password);

  const existingUser = await db.collection('users').findOne({email : email});


  if(existingUser){
    res.status(422).json({message: "User already exists"})
    client.close();
    return;
  }



  const result = await db.collection("users").insertOne({
      name: username,
      email: email,
      password: hashedPassword,
    })

  client.close();


  res.status(200).json({ result: "Created User!" });

}

export default handler;
