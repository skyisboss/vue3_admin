import Mock from "mockjs";

const makeMenu = (name, id, pid, link, page, child = []) => {
  return {
    name: name,
    id: id,
    pid: pid,
    view: page,
    href: link,
    icon: "icon el-icon-monitor",
    child: child,
  };
};

var gid = 0;
const getId = (id = null) => {
  if (id) {
    gid = id;
    return id;
  }
  gid = gid + 1;
  return gid + 10;
};

Mock.mock("/v1/api/menu", "", () => {
  return {
    err: 0,
    msg: "",
    data: [
      makeMenu("控制台", getId(1), 0, null, null, [
        makeMenu("侧边栏1", getId(), 1, "/home", "/home/Index"),
        makeMenu("侧边栏2", getId(), 1, "/data", "/home/Data"),
        makeMenu("侧边栏3", getId(), 1, "/profile", "/home/Profile"),
        makeMenu("侧边栏4", getId(), 1, "/home/backup", "/home/Backup", [
          makeMenu("侧边栏4-0", getId(), 1, "/data", "/home/Data"),
          makeMenu("侧边栏4-1", getId(), 1, "/profile", "/home/Profile"),
        ]),
      ]),
      makeMenu("控制台2", getId(1), 0, null, null, [
        makeMenu("侧边栏1", getId(), 1, "/home", "/home/Index"),
        makeMenu("侧边栏2", getId(), 1, "/data", "/home/Data"),
        makeMenu("侧边栏3", getId(), 1, "/profile", "/home/Profile"),
        makeMenu("侧边栏4", getId(), 1, "/home/task", "/home/Task"),
      ]),
    ],
  };
});
