import React from "react";
import { View, Text } from "react-native";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("UI Error:", error, errorInfo);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.children !== this.props.children && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <View
          style={{
            padding: 24,
            marginVertical: 16,
            backgroundColor: "#fef2f2",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#fecaca",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 22 }}>⚠</Text>

          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#b91c1c",
              marginTop: 8,
            }}
          >
            Something went wrong
          </Text>

          <Text
            style={{
              fontSize: 13,
              color: "#7f1d1d",
              textAlign: "center",
              marginTop: 4,
            }}
          >
            We couldn't render this section. Please refresh or try again.
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}
