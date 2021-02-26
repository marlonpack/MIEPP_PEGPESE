export const API_URL = "http://192.168.0.99:71/GLOBAL/Controller/";

export function USER_DATE(session, id) {
  return {
    url: API_URL + "CCPP/Employee.php?AUTH=" + session + "&app_id=5&id=" + id,
    options: {
      method: "GET",
    },
  };
}

export function TOKEN_POST(body) {
  return {
    url: API_URL + "CCPP/Login.php?login&app_id=5",
    options: {
      method: "POST",
      body: JSON.stringify(body),
    },
  };
}

export function PUT_PASSWORD(body) {
  return {
    url: API_URL + "CCPP/Login.php?login&app_id=5",
    options: {
      method: "PUT",
      body: JSON.stringify(body),
    },
  };
}

export function USER_GET_PHOTO(session, id) {
  return {
    url:
      API_URL + "CCPP/EmployeePhoto.php?AUTH=" + session + "&app_id=5&id=" + id,
    options: {
      method: "GET",
    },
  };
}

export function GET_PROVIDERS(session) {
  return {
    url: `${API_URL}MIEPP/Supplier.php?AUTH=${session}&app_id=5`,
    options: {
      method: "GET",
    },
  };
}

export function GET_PROVIDER(session, id) {
  return {
    url: `${API_URL}MIEPP/Supplier.php?AUTH=${session}&app_id=5&id=${id}`,
    options: {
      method: "GET",
    },
  };
}

export function POST_PROVIDER(session, body) {
  return {
    url: `${API_URL}MIEPP/Supplier.php?AUTH=${session}&app_id=5`,
    options: {
      method: "POST",
      body: JSON.stringify(body),
    },
  };
}

export function PUT_PROVIDER(session, body) {
  return {
    url: `${API_URL}MIEPP/Supplier.php?AUTH=${session}&app_id=5`,
    options: {
      method: "PUT",
      body: JSON.stringify(body),
    },
  };
}

export function DELETE_PROVIDER(session, body) {
  return {
    url: `${API_URL}MIEPP/Supplier.php?AUTH=${session}&app_id=5`,
    options: {
      method: "DELETE",
      body: JSON.stringify(body),
    },
  };
}

export function GET_MEDIA(session) {
  return {
    url: `${API_URL}MIEPP/Media.php?AUTH=${session}&app_id=5`,
    options: {
      method: "GET",
    },
  };
}

export function GET_MEDIA_FILE(session, id) {
  return {
    url: `${API_URL}MIEPP/Media.php?AUTH=${session}&app_id=5&id=${id}&field=file`,
    options: {
      method: "GET",
    },
  };
}

export function POST_MEDIA(session, body) {
  return {
    url: `${API_URL}MIEPP/Media.php?AUTH=${session}&app_id=5`,
    options: {
      method: "POST",
      body: JSON.stringify(body),
    },
  };
}

export function PUT_MEDIA(session, body) {
  return {
    url: `${API_URL}MIEPP/Media.php?AUTH=${session}&app_id=5`,

    options: {
      method: "PUT",
      body: JSON.stringify(body),
    },
  };
}

export function DELETE_MEDIA(session, body) {
  return {
    url: `${API_URL}MIEPP/Media.php?AUTH=${session}&app_id=5`,
    options: {
      method: "DELETE",
      body: JSON.stringify(body),
    },
  };
}

export function GET_SCREEEN(session) {
  return {
    url: `${API_URL}MIEPP/Screen.php?AUTH=${session}&app_id=5`,
    options: {
      method: "GET",
    },
  };
}

export function POST_SCREEEN(session, body) {
  console.log(body);
  return {
    url: `${API_URL}MIEPP/Screen.php?AUTH=${session}&app_id=5`,
    options: {
      method: "POST",
      body: JSON.stringify(body),
    },
  };
}

export function PUT_SCREEEN(session, body) {
  return {
    url: `${API_URL}MIEPP/Screen.php?AUTH=${session}&app_id=5`,
    options: {
      method: "PUT",
      body: JSON.stringify(body),
    },
  };
}

export function DELETE_SCREEEN(session, body) {
  return {
    url: `${API_URL}MIEPP/Screen.php?AUTH=${session}&app_id=5`,
    options: {
      method: "DELETE",
      body: JSON.stringify(body),
    },
  };
}

export function GET_TIMELINE(session) {
  return {
    url: `${API_URL}MIEPP/Timeline.php?AUTH=${session}&app_id=5`,
    options: {
      method: "GET",
    },
  };
}

export function POST_TIMELINE(session, body) {
  return {
    url: `${API_URL}MIEPP/Timeline.php?AUTH=${session}&app_id=5`,
    options: {
      method: "POST",
      body: JSON.stringify(body),
    },
  };
}

export function DELETE_TIMELINE(session, body) {
  return {
    url: `${API_URL}MIEPP/Timeline.php?AUTH=${session}&app_id=5`,
    options: {
      method: "DELETE",
      body: JSON.stringify(body),
    },
  };
}

export function PUT_TIMELINE(session, body) {
  return {
    url: `${API_URL}MIEPP/Timeline.php?AUTH=${session}&app_id=5`,
    options: {
      method: "PUT",
      body: JSON.stringify(body),
    },
  };
}
