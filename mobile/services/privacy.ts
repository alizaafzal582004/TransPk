import { Alert } from 'react-native';

let voiceDisclosureAccepted = false;

export function confirmVoiceDataProcessing(): Promise<boolean> {
  if (voiceDisclosureAccepted) return Promise.resolve(true);

  return new Promise((resolve) => {
    Alert.alert(
      'Voice data processing',
      'Your recording will be sent securely to the TransPk server and Groq to transcribe and translate it. TransPk deletes its temporary audio copy after processing.',
      [
        { text: 'Cancel', style: 'cancel', onPress: () => resolve(false) },
        {
          text: 'Continue',
          onPress: () => {
            voiceDisclosureAccepted = true;
            resolve(true);
          },
        },
      ],
      { cancelable: true, onDismiss: () => resolve(false) },
    );
  });
}
