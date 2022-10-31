export function CkEmail(data) {
  let reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !reg.test(data) ? true : false;
}

export function CkPass(data) {
  let reg = /^(?!\D+$)(?![a-zA-Z]+$)\S{6,15}$/;

  return !reg.test(data) ? true : false;
}
