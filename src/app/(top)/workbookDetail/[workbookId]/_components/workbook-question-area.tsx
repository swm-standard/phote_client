import React, {useEffect, useState} from 'react';
import {QuestionInWorkbook, Status} from '@/app/_lib/types';
import {useParams} from 'next/navigation';
import {BASE_URL} from '@/app/_lib/constants';
import {Reorder} from 'framer-motion';
import QuestionCards from '@/components/question-card';
import Container from "@/components/container";
import BarButton from "@/components/bar-button";
import PlusIcon from "@/static/icons/plus-icon";

const WorkbookQuestionArea = () => {
    const [status, setStatus] = useState<Status>('loading');
    const [questions, setQuestions] = useState<QuestionInWorkbook[]>([]);
    const params = useParams<{ workbookId: string }>();

    useEffect(() => {
        fetch(`${BASE_URL}/workbook/questions/${params.workbookId}`)
            .then((res) => res.json())
            .then((res) => {
                setQuestions(res);
                setStatus('success');
            })
            .catch((err) => setStatus('error'));
    }, []);

    useEffect(() => {
    }, [questions]);

    if (status === 'loading') return <div>loading..</div>;
    else if (status === 'error') return <div>Question Data fetch Error</div>;

    return (
        <Container className='bg-white flex flex-col justify-between'>
            <Reorder.Group
                axis="y"
                onReorder={setQuestions}
                values={questions}
                layoutScroll
            >
                <QuestionCards questions={questions} allowSwap/>
            </Reorder.Group>
            <div className="sticky bottom-4 my-4 px-4 w-full">
                <BarButton
                    Icon={PlusIcon}
                    text="문제 등록"
                    href={'/register-question'}
                />
            </div>
        </Container>
    );
};

export default WorkbookQuestionArea;
