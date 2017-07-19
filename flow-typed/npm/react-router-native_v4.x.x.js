// flow-typed signature: cfd5bb80e9f1dbd3cd343de9b9e46a83
// flow-typed version: b43dff3e0e/react-router-native_v4.x.x/flow_>=v0.28.x

declare module 'react-router-native' {
  declare export type GetUserConfirmation =
    (message: string, callback: (confirmed: boolean) => void) => void

  declare type LocationShape = {
    pathname?: string,
    search?: string,
    hash?: string,
    state?: any,
  }

  declare export class NativeRouter extends React$Component {
    props: {
      getUserConfirmation?: GetUserConfirmation,
      keyLength?: number,
      children?: React$Element<*>,
    }
  }

  declare export class Link extends React$Component {
    props: {
      to: string | LocationShape,
      replace?: boolean,
      children?: React$Element<*>,
    }
  }

  declare export class DeepLinking extends React$Component {}

  declare export class AndroidBackButton extends React$Component {}
}
