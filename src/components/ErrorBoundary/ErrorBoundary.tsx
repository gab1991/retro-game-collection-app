import React, { ErrorInfo, ReactNode } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Routes } from 'Routes';

import { ButtonNeon } from 'Components/UI';

import styles from './ErrorBoundary.module.scss';

interface IErrorBoundaryProps extends RouteComponentProps {
  children: ReactNode;
}

interface IErrorBoundaryState {
  count: number;
  hasError: boolean;
  timer: number;
}

class _ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState, { timer: number }> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { count: 9, hasError: false, timer: 0 };
    this.countDown = this.countDown.bind(this);
    this.goToHome = this.goToHome.bind(this);
  }

  componentDidUpdate(): void {
    if (!this.state.count) {
    }
  }

  componentWillUnmount(): void {
    clearInterval(this.state.timer);
  }

  countDown(): void {
    if (this.state.count > 0) {
      return this.setState({ count: this.state.count - 1 });
    }
  }

  componentDidCatch(error: unknown, info: ErrorInfo): void {
    const tickInterval = 1000;
    const timer = window.setInterval(this.countDown, tickInterval);

    this.setState({ hasError: true, timer });
    console.error(error, info);
  }

  reload(): void {
    window.location.reload();
  }

  goToHome(): void {
    this.props.history.push(Routes.PlatformSelector.makePath());
    this.reload();
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className={styles.ErrorBoundary}>
          <h1>GAME OVER</h1>
          <p>CONTINUE?</p>
          {this.state.count ? (
            <p>{this.state.count}</p>
          ) : (
            <p className={styles.AppCrashedTxt}>
              {'Unfortunately App Crashed....Choose one of the option below or try to refresh page manually'}
            </p>
          )}
          <div className={styles.BtnSection}>
            <ButtonNeon txtContent={'Try to Realod'} onClick={this.reload} />
            <ButtonNeon txtContent={'Go to Home Page'} onClick={this.goToHome} />
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export const ErrorBoundary = withRouter(_ErrorBoundary);
