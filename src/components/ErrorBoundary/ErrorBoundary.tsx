import React, { ErrorInfo, ReactNode } from 'react';
import { Redirect } from 'react-router-dom';
import { Routes } from 'Routes';

import { ButtonNeon } from 'Components/UI';

import styles from './ErrorBoundary.module.scss';

interface IErrorBoundaryProps {
  children: ReactNode;
}

interface IErrorBoundaryState {
  count: number;
  hasError: boolean;
  timer: number;
}

export class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState, { timer: number }> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { count: 9, hasError: false, timer: 0 };
    this.countDown = this.countDown.bind(this);
  }

  componentDidUpdate(): void {
    if (!this.state.count) {
      window.location.reload();
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

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className={styles.ErrorBoundary}>
          <h1>GAME OVER</h1>
          <p>CONTINUE?</p>
          <p>{this.state.count}</p>
          <div className={styles.BtnSection}>
            <ButtonNeon txtContent={'Yes'} />
          </div>
          <Redirect to={Routes.PlatformSelector.makePath()} />
        </div>
      );
    }
    return this.props.children;
  }
}
