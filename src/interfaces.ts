export interface IData {
  drawer: boolean;
  links: ILinkItem[];
}

interface ILinkItem {
  title: string;
  icon: string;
  url: string;
}
