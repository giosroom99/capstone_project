export function getUserfullName(id: string) {
  const foundUser = allUsers.find((user) => user.p_id === id);
  if (foundUser) {
    return `${foundUser.f_name} ${foundUser.l_name}`;
  } else {
    return "";
  }
}
