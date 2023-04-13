import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    database: "тnotes_project",
    password: "",
  })
  .promise();

export async function findUser(login) {
  try {
    const [row] = await pool.query(
      `
  SELECT user_id, name, password
  from User
  WHERE name = ?
  `,
      [login]
    );
    return row[0];
  } catch (error) {
    return error
  }
}

export async function createUser(login, password) {
try {
   const [result] = await pool.query(
     `
  INSERT INTO User (user_id, name, password)
  VALUES (?, ?, ?)`,
     [null, login, password]
   );
   if (result) {
     return {
       ok: true,
     };
   }
} catch (error) {
  return error
}
}

async function getNote(id, userId) {
  try {
    const [row] = await pool.query(
      `
    SELECT * 
    from notes
    WHERE id = ? AND user_id = ?
  `,
      [id, userId]
    );
    return row[0];
  } catch (error) {
    return error
  }
}

export async function getNotes(userId) {
  try {
    const [row] = await pool.query(
      `
    SELECT * 
    from todos
    WHERE user_id = ?
  `,
      [userId]
    );
    return row || null;
  } catch (error) {
    return error
  }
}

export async function createNote(text, userId) {
  try {
    const [result] = await pool.query(
      `
  INSERT INTO notes (id, text, status, user_id)
  VALUES (?, ?, ?, ?)`,
      [null, text, false, userId]
    );
    const note = await getNote(result.insertId, userId);
    return note;
  } catch (error) {
    return error;
  }
}

export async function editNote(text, id, userId, status = 0) {
  try {
    const [result] = await pool.query(
      `
    UPDATE notes
    SET text = ?,
        status = ?
    WHERE id = ? AND user_id = ?
  `,
      [text, status, id, userId]
    );

    if (result) {
      const note = await getNote(id, userId);
      return note;
    }
  } catch (error) {
    return error
  }
}

export async function removeNote(id, userId) {
  try {
    const [result] = await pool.query(
      `
    DELETE from notes
    WHERE id = ? AND user_id = ?
  `,
      [id, userId]
    );
    if (result) {
      return {
        deleted: result.affectedRows,
      };
    } else return null;
  } catch (error) {
    return error
  }
}

export async function removeAllNotes(userId) {
  try {
    const res = await pool.query(
      `
    DELETE from notes
    WHERE user_id = ?
  `,
      [userId]
    );
    return res;
  } catch (error) {
    return error
  }
}
