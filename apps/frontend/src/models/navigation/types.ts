export type NavigationItemType = {
  name: string;
  link: string;
  subs?: NavigationItemType[] | [];
};
