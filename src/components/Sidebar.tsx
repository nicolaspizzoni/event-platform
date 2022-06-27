import { gql, useQuery } from "@apollo/client";
import { useGetLessonsQuery } from "../graphql/generated";
import { Lesson } from "./Lesson";

// const GET_LESSON_QUERY = gql`
//     query {
//         lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
//             availableAt
//             id
//             lessonType
//             slug
//             title
//         }
//     }
// `

// interface LessonProps {
//     id: string;
//     title: string;
//     slug: string;
//     availableAt: string;
//     lessonType: 'live' | 'class';
// }

// interface GetLessonQueryResponse {
//     lessons: LessonProps[]
// }

export function Sidebar(){
    // const {data} = useQuery<GetLessonQueryResponse>(GET_LESSON_QUERY)

    // useGetLessonsQuery recebe esse nome pois o nome é graphql/queries/get-lessons-query.graphql
    const {data} = useGetLessonsQuery()

    return(
        <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600">
            <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
                Cronograma de aulas
            </span>
            <div
                className="flex flex-col gap-8"
            >
                {
                    data?.lessons.map(lesson => (
                        <Lesson
                            key={lesson.id}
                            title={lesson.title}
                            slugProp={lesson.slug}
                            availableAt={new Date(lesson.availableAt)}
                            type={lesson.lessonType}
                        />
                    ))
                }
            </div>
        </aside>
    )
}