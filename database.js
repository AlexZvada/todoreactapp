import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    database: "notes_project",
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
    return null;
  }
}

export async function createUser(login, password, email) {
  try {
    const [result] = await pool.query(
      `
  INSERT INTO User (user_id, name, password, email)
  VALUES (?, ?, ?, ?)`,
      [null, login, password, email]
    );
    console.log(result);
    if (result) {
      return {
        ok: true,
      };
    }
  } catch (error) {
    return null;
  }
}

export async function getNote(id, userId) {
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
    return null;
  }
}

export async function toggleStatus(id, userId, status) {
  try {
    const [result] = await pool.query(
      `
      UPDATE notes
    SET status = ?
    WHERE id = ? AND user_id = ?
      `,
      [status, id, userId]
    );
    if (result) {
      const note = await getNote(id, userId);
      return note;
    }
  } catch (error) {}
}

export async function getNotes(userId) {
  try {
    const [row] = await pool.query(
      `
    SELECT * 
    from notes
    WHERE user_id = ?
  `,
      [userId]
    );
    return row || null;
  } catch (error) {
    return null;
  }
}

export async function createNote(title, text, userId) {
  try {
    const [result] = await pool.query(
      `
  INSERT INTO notes (id, title, text, status, user_id)
  VALUES (?, ?, ?, ?, ?)`,
      [null, title, text, false, userId]
    );
    const note = await getNote(result.insertId, userId);
    console.log(result);
    return note;
  } catch (error) {
    return null;
  }
}

export async function editNote(title, text, id, userId, status = 0) {
  try {
    const [result] = await pool.query(
      `
    UPDATE notes
    SET title = ?,
        text = ?,
        status = ?
    WHERE id = ? AND user_id = ?
  `,
      [title, text, status, id, userId]
    );

    if (result) {
      const note = await getNote(id, userId);
      return note;
    }
  } catch (error) {
    return null;
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
    return null;
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
    return error;
  }
}
