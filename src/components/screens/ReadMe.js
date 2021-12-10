import {SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import Markdown from 'react-native-markdown-display';
import {readmeContent} from '../../readme';

export const ReadMe = () => {
    return (
        <SafeAreaView>
            <ScrollView>
                <Markdown styles={styles}>
                    {readmeContent}
                </Markdown>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = {
    heading1: {
        fontSize: 22,
    },
    heading2: {
        fontSize: 20,
    },
    heading3: {
        fontSize: 18,
    },
    strong: {
        fontSize: 18,
    },
    paragraph: {
        fontSize: 14,
    },
    view: {
        borderWidth: 1,
    },
};
