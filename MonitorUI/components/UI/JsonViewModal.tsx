import React from "react";
import {
  Modal,
  View,
  Text,
  ScrollView,
  Pressable,
  TextStyle,StyleSheet
} from "react-native";
import { globalStyles } from "../../styles/globalStyle";

interface Props {
  visible: boolean;
  Json?: any;
  onClose: () => void;
}

export const JsonViewerModal = ({
  visible,
  Json,
  onClose,
}: Props) => {
  const formatJson = (data: any) => {
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return data;
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>JSON</Text>

            <Pressable onPress={onClose}>
              <Text style={styles.close}>✕</Text>
            </Pressable>
          </View>

          <ScrollView style={styles.body}>
            <View style={styles.jsonBox}>
              <Text style={styles.jsonText}>{formatJson(Json)}</Text>
            </View>
          </ScrollView>

          {/* Bottom Close */}
          <Pressable style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeBtnText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    width: "85%",
    height: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
  },

  close: {
    fontSize: 20,
    color: "red",
  },

  body: {
    flex: 1,
  },

  sectionTitle: {
    fontWeight: "600" as TextStyle["fontWeight"],
    marginTop: 10,
    marginBottom: 6,
  },

  jsonBox: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 6,
  },

  jsonText: {
    fontFamily: "monospace",
    fontSize: 12,
  },

  closeBtn: {
    marginTop: 10,
    backgroundColor: "#6366f1",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },

  closeBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
});
